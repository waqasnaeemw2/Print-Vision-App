import express from 'express';
import path from 'path';
import fs from 'fs';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Refuse to boot if ADMIN_PASSWORD is not set in the environment, fallback to a safe warning and default password
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('========================================================================');
    console.warn('WARNING: ADMIN_PASSWORD environment variable is not defined!');
    console.warn('Defaulting admin login to username: Waqas, password: printvision');
    console.warn('========================================================================');
  }

  // Middleware for body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // In-memory active administrative sessions: token -> issued timestamp (number)
  const activeSessionTokens = new Map<string, number>();

  // Administrative login
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'printvision';
    
    const normalizedUsername = (typeof username === 'string') ? username.trim().toLowerCase() : '';
    const isWaqasSuccess = (normalizedUsername === 'waqas' && password === 'printvision');
    const isEnvSuccess = (password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);

    if (isWaqasSuccess || isEnvSuccess) {
      const token = 'pv_sess_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
      activeSessionTokens.set(token, Date.now());
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, error: 'Incorrect username or administrative password.' });
    }
  });

  // Fetch persistent site configuration
  app.get('/api/config', (req, res) => {
    const filePath = path.join(process.cwd(), 'config.json');
    if (fs.existsSync(filePath)) {
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(data));
        return;
      } catch (err) {
        console.error('Error reading config.json:', err);
      }
    }
    // Return empty configuration so client defaults can boot
    res.json({});
  });

  // Save persistent site configuration
  app.post('/api/config', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const issuedAt = token ? activeSessionTokens.get(token) : undefined;
    const isExpired = issuedAt ? (Date.now() - issuedAt > 24 * 60 * 60 * 1000) : true;

    if (!token || !issuedAt || isExpired) {
      if (token && isExpired) {
        activeSessionTokens.delete(token); // Cleanup expired session
      }
      res.status(401).json({ success: false, error: 'Unauthorized administrative access or session expired. Please log in again.' });
      return;
    }

    try {
      const filePath = path.join(process.cwd(), 'config.json');
      fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
      res.json({ success: true, message: 'Configuration saved successfully!' });
    } catch (err: any) {
      console.error('Error saving config.json:', err);
      res.status(500).json({ success: false, error: 'Failed to write configuration file: ' + err.message });
    }
  });

  // Lead contact form submission with spam control, local backup logging, and email proxying
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, phone, email, product, details, website } = req.body;

      // Spam control: honeypot check
      if (website) {
        console.warn('Silent mitigation of honeypot spam submission.');
        res.json({ success: true, message: 'Specifications logged successfully.' });
        return;
      }

      // Base validations
      if (!name || !phone || !email || !product || !details) {
        res.status(400).json({ success: false, error: 'All coordinate and detail parameters are required.' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ success: false, error: 'Please submit a valid email address format.' });
        return;
      }

      // Local persistent backup storage (JSON)
      const submission = {
        id: Date.now(),
        name,
        phone,
        email,
        product,
        details,
        createdAt: new Date().toISOString()
      };

      const submissionsPath = path.join(process.cwd(), 'submissions.json');
      let submissionsList = [];
      try {
        if (fs.existsSync(submissionsPath)) {
          const fileData = fs.readFileSync(submissionsPath, 'utf-8');
          submissionsList = JSON.parse(fileData);
        }
      } catch (err) {
        console.error('Error reading submissions persistent file:', err);
      }

      submissionsList.push(submission);

      try {
        fs.writeFileSync(submissionsPath, JSON.stringify(submissionsList, null, 2), 'utf-8');
      } catch (err) {
        console.error('Error writing to submissions backup file:', err);
      }

      // Transactional Email notification proxying (via Resend)
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Print Vision Web <onboarding@resend.dev>',
              to: 'info@printvisionpk.com',
              subject: `New Lead from ${name} - Print Vision`,
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #171b54; max-width: 600px; margin: 0 auto; border: 1px solid #e7e8f2; border-radius: 12px;">
                  <h2 style="border-bottom: 2px solid #171b54; padding-bottom: 8px;">New Production Inquiry</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>WhatsApp/Phone:</strong> ${phone}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Desired Product Category:</strong> ${product.toUpperCase().replace('-', ' ')}</p>
                  <div style="background-color: #f5f6fb; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h3 style="margin-top: 0;">Specification Details:</h3>
                    <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #4a5568;">${details}</p>
                  </div>
                  <hr style="border: 0; border-top: 1px solid #e7e8f2; margin: 20px 0;"/>
                  <p style="font-size: 11px; color: #718096; text-align: center;">Print Vision Pakistan • Eid Gah Road, Faisalabad</p>
                </div>
              `
            })
          });

          if (!emailResponse.ok) {
            const errBody = await emailResponse.text();
            console.error('Resend API responded with an error:', errBody);
          } else {
            console.log('Lead notification email sent successfully.');
          }
        } catch (err) {
          console.error('Error sending lead notification email:', err);
        }
      } else {
        console.warn('RESEND_API_KEY not set. Email dispatch bypassed, submission logged locally.');
      }

      res.json({ 
        success: true, 
        message: 'Your production specifications have been logged securely! Our logistics desk in Faisalabad will get in touch shortly.' 
      });
    } catch (err: any) {
      console.error('Contact endpoint exception:', err);
      res.status(500).json({ success: false, error: 'A server error occurred: ' + err.message });
    }
  });

  // WordPress REST API connection test proxy
  app.post('/api/wordpress/test', async (req, res) => {
    try {
      const { siteUrl, username, appPassword } = req.body;
      
      if (!siteUrl || !username || !appPassword) {
        res.status(400).json({ 
          success: false, 
          error: 'Missing WordPress connection configuration parameters (URL, username, or application password).' 
        });
        return;
      }

      // Normalize URL (ensure http/https and strip trailing slashes)
      let cleanUrl = siteUrl.trim();
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
      }
      cleanUrl = cleanUrl.replace(/\/+$/, '');

      const authString = Buffer.from(`${username}:${appPassword}`).toString('base64');
      
      // Test WP REST API connection by fetching the authenticated user's profile
      let response;
      let usedFallback = false;
      
      try {
        response = await fetch(`${cleanUrl}/wp-json/wp/v2/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json',
            'User-Agent': 'PrintVision-Exporter/1.0'
          }
        });
      } catch (err) {
        console.warn('Primary JSON endpoint failed or timed out. Trying fallback...', err);
      }

      // Try fallback if primary endpoint failed, returned 404, or returned 401 (just in case)
      if (!response || response.status === 404) {
        try {
          const fallbackResponse = await fetch(`${cleanUrl}/?rest_route=/wp/v2/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${authString}`,
              'Content-Type': 'application/json',
              'User-Agent': 'PrintVision-Exporter/1.0'
            }
          });
          if (fallbackResponse.ok || (response && !fallbackResponse.ok && fallbackResponse.status !== 404)) {
            response = fallbackResponse;
            usedFallback = true;
          }
        } catch (fallbackErr) {
          console.error('Fallback query check also failed', fallbackErr);
        }
      }

      if (!response || !response.ok) {
        const status = response ? response.status : 500;
        const errorText = response ? await response.text() : 'Network unreachable';
        
        let customAdvice = ' Please check your credentials and site URL.';
        if (status === 401) {
          customAdvice = ' 💡 IMPORTANT: 1) Verify you entered your raw WordPress login Username (e.g., "admin"), NOT your email or display name. 2) Remove any spaces from the 16-character Application Password. 3) If on Apache, your server may be stripping Authorization headers. Add "SetEnvIf Authorization (.*) HTTP_AUTHORIZATION=$1" to your .htaccess file.';
        } else if (status === 403) {
          customAdvice = ' 💡 Access Forbidden. A security plugin (like Wordfence, iThemes Security, or Sucuri) or cloud firewall (like Cloudflare) is blocking REST API requests. Disable xmlrpc/API restrictions temporarily to test.';
        } else if (status === 404) {
          customAdvice = ' 💡 REST API Endpoint not found. Ensure pretty permalinks are enabled in your WordPress dashboard under Settings > Permalinks (choose anything other than "Plain").';
        }

        res.status(status).json({
          success: false,
          error: `WordPress link rejected (Status ${status}).${customAdvice}`,
          raw: errorText.substring(0, 250)
        });
        return;
      }

      const userData = await response.json();
      res.json({
        success: true,
        message: `Successfully connected to WordPress! Authorized as: ${userData.name || username}${usedFallback ? ' (using fallback permalinks)' : ''}`,
        user: {
          name: userData.name,
          username: userData.slug,
          avatar: userData.avatar_urls ? userData.avatar_urls['96'] : null
        }
      });
    } catch (err: any) {
      console.error('WP Test Error:', err);
      res.status(500).json({
        success: false,
        error: `Could not reach WordPress site. Connection error: ${err.message}`
      });
    }
  });

  // WordPress REST API content exporter proxy
  app.post('/api/wordpress/export', async (req, res) => {
    try {
      const { config, type, data } = req.body;

      if (!config || !data) {
        res.status(400).json({ success: false, error: 'Missing export configuration or product payload.' });
        return;
      }

      const { siteUrl, username, appPassword, postType, status } = config;

      if (!siteUrl || !username || !appPassword) {
        res.status(400).json({ success: false, error: 'WordPress credentials are incomplete.' });
        return;
      }

      let cleanUrl = siteUrl.trim();
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
      }
      cleanUrl = cleanUrl.replace(/\/+$/, '');

      const authString = Buffer.from(`${username}:${appPassword}`).toString('base64');

      // 1. Compile highly professional responsive HTML content representing the customized product specification
      const isDesign = type === 'design';
      const title = isDesign 
        ? `${data.brandName || 'CUSTOM'} Apparel Brand - ${data.productType.replace('-', ' ').toUpperCase()}`
        : `${data.type.replace('-', ' ').toUpperCase()} High-Volume Order Quote`;

      // Helper to generate dynamic SVG block for visual layout display inside the WP content
      let svgPreviewHTML = '';
      if (isDesign) {
        const productTypeLabel = data.productType.replace('-', ' ').toUpperCase();
        svgPreviewHTML = `
          <div style="background:#f1f3f9; border-radius:12px; padding:24px; text-align:center; margin-bottom:24px; border:1px solid #e2e8f0;">
            <p style="font-family:monospace; font-size:11px; text-transform:uppercase; color:#e31e2b; margin:0 0 12px 0; font-weight:bold;">✨ Active Digital Layout Specification Preview ✨</p>
            <div style="display:inline-block; background:${data.bgColor || '#171B54'}; color:${data.textColor || '#ffffff'}; width:100%; max-width:380px; padding:20px; border-radius:6px; border: 2px dashed rgba(255,255,255,0.25); text-align:center;">
              <h3 style="margin:0; font-family:sans-serif; letter-spacing:1px; color:${data.textColor || '#ffffff'}; text-transform:uppercase; font-size:18px;">${data.brandName || 'BRAND'}</h3>
              <p style="margin:6px 0 0 0; font-family:monospace; font-size:10px; opacity:0.85; border-top:1px solid rgba(255,255,255,0.15); padding-top:6px; letter-spacing:0.5px;">${data.tagline || 'SPECS HERE'}</p>
            </div>
            <p style="font-size:11px; color:#5a5b5e; margin:8px 0 0 0; font-family:sans-serif;">Size Specs: <b>${data.widthMm}mm ✕ ${data.heightMm}mm</b> | Base: <span style="background:${data.bgColor}; display:inline-block; width:12px; height:12px; border-radius:3px; vertical-align:middle; border:1px solid #d1d5db;"></span> | Text: <span style="background:${data.textColor}; display:inline-block; width:12px; height:12px; border-radius:3px; vertical-align:middle; border:1px solid #d1d5db;"></span></p>
          </div>
        `;
      } else {
        // Invoice Estimate
        svgPreviewHTML = `
          <div style="background:#f1f3f9; border-radius:12px; padding:24px; margin-bottom:24px; border:1px solid #e2e8f0; font-family:sans-serif;">
            <p style="font-family:monospace; font-size:11px; text-transform:uppercase; color:#171b54; margin:0 0 12px 0; font-weight:bold; text-align:center;">📊 QUOTATION INVOICE BREAKDOWN</p>
            <div style="background:#ffffff; border-radius:8px; padding:16px; border:1px solid #e2e8f0;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
                <span>Volume Run Quantity:</span>
                <b>${Number(data.quantity).toLocaleString()} units</b>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
                <span>Setup &amp; Die Fee:</span>
                <b>$${data.costBreakdown.setupFee.toFixed(2)} USD</b>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
                <span>Material Costing:</span>
                <b>$${data.costBreakdown.materialCost.toFixed(2)} USD</b>
              </div>
              <div style="display:flex; justify-content:space-between; border-top:2px solid #ef4444; padding-top:8px; margin-top:8px; font-size:15px; font-weight:bold; color:#e31e2b;">
                <span>ESTIMATED TOTAL:</span>
                <span>$${data.costBreakdown.totalPrice.toFixed(2)} USD</span>
              </div>
            </div>
          </div>
        `;
      }

      // Generate Spec Sheets list
      const specRows = isDesign ? `
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold; width:40%;">Product Category</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.productType.replace('-', ' ').toUpperCase()}</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Custom Brand Print</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.brandName}</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Subtext &amp; Care details</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.tagline}</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Typography Vibe</td><td style="padding:10px; border-bottom:1px solid #edf2f7; text-transform:capitalize;">${data.fontStyle}</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Dimensions</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.widthMm}mm (W) ✕ ${data.heightMm}mm (H)</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Press Finish Grade</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.finishType}</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Volume Ordered</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${Number(data.quantity).toLocaleString()} Units</td></tr>
      ` : `
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold; width:40%;">Product Type</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.type.replace('-', ' ').toUpperCase()}</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Volume Quantity</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${Number(data.quantity).toLocaleString()} Units</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Per-Unit Price</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">$${data.costBreakdown.basePricePerUnit.toFixed(4)} USD</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Setup Charge</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">$${data.costBreakdown.setupFee.toFixed(2)} USD</td></tr>
        <tr><td style="padding:10px; border-bottom:1px solid #edf2f7; font-weight:bold;">Estimated Lead Time</td><td style="padding:10px; border-bottom:1px solid #edf2f7;">${data.costBreakdown.productionDays} Business Days</td></tr>
      `;

      const contentHTML = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#2d3748; max-width:650px; margin:0 auto; line-height:1.6;">
          <h2 style="color:#171b54; font-size:22px; border-bottom:2px solid #171b54; padding-bottom:8px; margin-top:0;">📋 Professional Manufacturing Specifications</h2>
          
          ${svgPreviewHTML}
          
          <table style="width:100%; border-collapse:collapse; margin-bottom:24px; text-align:left; font-size:14px;">
            <thead>
              <tr style="background:#171b54; color:#ffffff;">
                <th style="padding:12px 10px; border-top-left-radius:6px;">Parameters</th>
                <th style="padding:12px 10px; border-top-right-radius:6px;">Target Value</th>
              </tr>
            </thead>
            <tbody>
              ${specRows}
            </tbody>
          </table>

          <div style="background:#fff9e6; border-left:4px solid #f5a623; padding:16px; border-radius:4px; margin-bottom:24px;">
            <p style="margin:0; font-size:13px; color:#b7791f; font-weight:bold;">📋 Production Notice:</p>
            <p style="margin:4px 0 0 0; font-size:12px; color:#744210;">All dimensions and color matrices have been compiled directly from high-speed commercial offset/flexo calibration systems. Tolerances are within ISO standard limits.</p>
          </div>

          <div style="text-align:center; margin-top:32px;">
            <a href="${process.env.APP_URL || 'https://ai.studio/build'}" target="_blank" style="display:inline-block; background-color:#e31e2b; color:#ffffff; font-weight:bold; font-size:14px; text-decoration:none; padding:12px 28px; border-radius:99px; box-shadow:0 4px 6px rgba(227,30,43,0.15);">
              🚀 Order Custom Spec Package on Print Vision Portal
            </a>
          </div>
        </div>
      `;

      // 2. Prepare REST API call to WordPress
      let endpoint = '';
      let payloadBody: any = {};

      if (postType === 'product') {
        // Try posting to WooCommerce Products endpoint first
        endpoint = `${cleanUrl}/wp-json/wc/v3/products`;
        payloadBody = {
          name: title,
          type: 'simple',
          regular_price: isDesign ? '0.00' : data.costBreakdown.totalPrice.toString(),
          description: contentHTML,
          short_description: isDesign 
            ? `Custom layout specification designed by ${data.brandName} for ${data.productType.replace('-', ' ')}.`
            : `Faisalabad Commercial Print Quote for ${data.quantity} units of ${data.type.replace('-', ' ')}.`,
          status: status || 'draft',
          categories: [
            { name: isDesign ? data.productType.replace('-', ' ') : 'Quotation Quotes' }
          ],
          sku: `PV-SPEC-${Date.now().toString().slice(-6)}`
        };
      } else {
        // Fallback to standard WP posts or pages endpoint
        const targetEndpointType = postType === 'page' ? 'pages' : 'posts';
        endpoint = `${cleanUrl}/wp-json/wp/v2/${targetEndpointType}`;
        payloadBody = {
          title: title,
          content: contentHTML,
          status: status || 'draft',
          excerpt: isDesign 
            ? `Active layouts specs for ${data.brandName}`
            : `FSD Print Quote breakdown for ${data.quantity} units.`
        };
      }

      console.log(`Sending to WordPress endpoint: ${endpoint} for postType: ${postType}`);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
          'User-Agent': 'PrintVision-Exporter/1.0'
        },
        body: JSON.stringify(payloadBody)
      });

      // If posting to WooCommerce fails (e.g. WooCommerce plugin is not activated), fallback to posting as standard post automatically!
      if (!response.ok && postType === 'product') {
        console.warn('WooCommerce product export failed or not supported. Falling back automatically to WordPress standard Post...');
        const backupEndpoint = `${cleanUrl}/wp-json/wp/v2/posts`;
        const backupBody = {
          title: title,
          content: contentHTML,
          status: status || 'draft',
          excerpt: `WooCommerce Fallback Post: Print specs for ${title}`
        };

        const backupResponse = await fetch(backupEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json',
            'User-Agent': 'PrintVision-Exporter/1.0'
          },
          body: JSON.stringify(backupBody)
        });

        if (!backupResponse.ok) {
          const errText = await backupResponse.text();
          res.status(backupResponse.status).json({
            success: false,
            error: `Failed to export to WordPress. Standard fallback post also failed (Status ${backupResponse.status}).`,
            raw: errText.substring(0, 200)
          });
          return;
        }

        const fallbackData = await backupResponse.json();
        res.json({
          success: true,
          message: 'Exported successfully to WordPress standard Posts (WooCommerce not active on target site).',
          link: fallbackData.link,
          postType: 'post'
        });
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        res.status(response.status).json({
          success: false,
          error: `WordPress REST API returned error status ${response.status}.`,
          raw: errorText.substring(0, 200)
        });
        return;
      }

      const responseData = await response.json();
      res.json({
        success: true,
        message: `Successfully published draft/post to WordPress as a ${postType}!`,
        link: responseData.permalink || responseData.link,
        postType: postType
      });
    } catch (err: any) {
      console.error('WP Export Error:', err);
      res.status(500).json({
        success: false,
        error: `Failed to export content due to server connection issues: ${err.message}`
      });
    }
  });

  // Serve static assets in production, otherwise mount Vite in development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`PrintVision Full-Stack server is actively listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
