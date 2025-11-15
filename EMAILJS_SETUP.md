# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions via email.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template structure:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Submission from AHDC Website

**Content:**
```
New Contact Form Submission from AHDC Website

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

**Important:** Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name (required)
- `{{from_email}}` - Sender's email (required)
- `{{phone}}` - Sender's phone number (required)
- `{{message}}` - Message content (required)
- `{{reply_to}}` - Reply-to email (recommended)

**Template Settings (Important!):**
1. **To Email:** Set this to `priyanshupratap5622@gmail.com` in the template settings (this is where you'll receive the emails)
2. **Reply To:** Set this field to `{{reply_to}}` in the template settings (so you can reply directly to the sender)
3. **Subject:** Set to "New Contact Form Submission from AHDC Website"

4. **Copy the Template ID** (you'll need this later)

## Step 4: Get Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (also called API Key)
3. **Copy the Public Key** (you'll need this later)

## Step 5: Configure Environment Variables

1. **Create a `.env` file** in the root of your project (same directory as `package.json`)

2. **Copy the template** from `env.template` file, or add the following variables to your `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_OWNER_EMAIL=owner@ahdc.com
   ```

3. **Replace the placeholder values** with your actual EmailJS credentials:
   - `your_service_id_here` → Your EmailJS Service ID (from Step 2)
   - `your_template_id_here` → Your EmailJS Template ID (from Step 3)
   - `your_public_key_here` → Your EmailJS Public Key (from Step 4)
   - `owner@ahdc.com` → Your actual email address where you want to receive contact form submissions

4. **Save the `.env` file**

   **Example of a completed `.env` file:**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
   VITE_OWNER_EMAIL=info@ahdc.com
   ```

## Step 6: Restart Development Server

After adding environment variables, restart your development server:

```bash
npm run dev
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the submission
4. You should receive an email with all the form details

## Troubleshooting

### Emails not being sent?
- Check that all environment variables are set correctly
- Verify your EmailJS service is connected and active
- Check the browser console for any error messages
- Make sure your EmailJS account has available email quota

### Environment variables not working?
- Make sure the `.env` file is in the root directory
- Restart your development server after adding environment variables
- Ensure variable names start with `VITE_` prefix

## Production Deployment

For production deployment:

1. Set the environment variables in your hosting platform:
   - Vercel: Add in Project Settings → Environment Variables
   - Netlify: Add in Site Settings → Environment Variables
   - Other platforms: Check their documentation for environment variable setup

2. Make sure to add the variables for **Production** environment

3. Redeploy your application after adding the variables

## EmailJS Free Tier Limits

- 200 emails per month
- Up to 2 email services
- Basic email templates

For more emails, consider upgrading to a paid plan.

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- EmailJS Public Key is safe to expose in frontend code (it's designed for client-side use)
- Service ID and Template ID are also safe to expose

## Support

If you need help:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

