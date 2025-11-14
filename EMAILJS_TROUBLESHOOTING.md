# EmailJS Troubleshooting Guide

## Common Error: 412 Precondition Failed

The 412 error typically means that your EmailJS template validation failed. This usually happens when:

1. **Template variables don't match** - The variables in your EmailJS template don't match what the code is sending
2. **Missing required variables** - Your template expects variables that aren't being sent
3. **Template not configured correctly** - The template settings (To Email, Reply To, etc.) aren't set up correctly

## How to Fix 412 Error

### Step 1: Verify Your EmailJS Template

1. Go to https://www.emailjs.com/
2. Navigate to **Email Templates**
3. Open your template: `template_lu020mi`
4. Check the **Content** section

### Step 2: Verify Template Variables

Your EmailJS template MUST include these exact variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Sender's phone number
- `{{message}}` - Message content
- `{{reply_to}}` - Reply-to email (optional, but recommended)

**Example Template Content:**
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

### Step 3: Verify Template Settings

In your EmailJS template settings, make sure:

1. **To Email:** Set to `priyanshupratap5622@gmail.com`
   - This is where you'll receive the emails
   - NOT a template variable, but a fixed email address

2. **Reply To:** Set to `{{reply_to}}`
   - This allows you to reply directly to the sender
   - This should be a template variable

3. **Subject:** Set to "New Contact Form Submission from AHDC Website"

### Step 4: Check Environment Variables

1. Verify your `.env` file contains:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_a291bgi
   VITE_EMAILJS_TEMPLATE_ID=template_lu020mi
   VITE_EMAILJS_PUBLIC_KEY=YeKlg_zGSdU6sorGV
   VITE_OWNER_EMAIL=priyanshupratap5622@gmail.com
   ```

2. **Restart your development server** after creating/modifying the `.env` file:
   ```bash
   npm run dev
   ```

3. Check the browser console for the EmailJS configuration logs to verify variables are loaded

### Step 5: Common Issues and Solutions

#### Issue 1: Template Variables Don't Match
**Solution:** Make sure the variable names in your EmailJS template EXACTLY match what the code sends:
- Code sends: `from_name`, `from_email`, `phone`, `message`, `reply_to`
- Template must have: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{reply_to}}`

#### Issue 2: Template Not Saved
**Solution:** Make sure you've saved your EmailJS template after making changes

#### Issue 3: Service Not Connected
**Solution:** 
1. Go to Email Services in EmailJS dashboard
2. Verify your Gmail service (`service_a291bgi`) is connected and active
3. Make sure the service is authorized

#### Issue 4: Template ID Mismatch
**Solution:** 
1. Double-check that `template_lu020mi` is the correct Template ID
2. Make sure you're using the Template ID, not the Template Name

#### Issue 5: Public Key Incorrect
**Solution:**
1. Go to Account → General in EmailJS dashboard
2. Verify your Public Key is correct
3. Make sure there are no extra spaces or characters

### Step 6: Test the Configuration

1. Open your browser's Developer Console (F12)
2. Fill out the contact form
3. Submit the form
4. Check the console for:
   - EmailJS Configuration logs
   - Template Params logs
   - Any error messages

### Step 7: Verify EmailJS Service

1. Go to **Email Services** in EmailJS dashboard
2. Click on your service (`service_a291bgi`)
3. Verify:
   - Service is **Connected** and **Active**
   - Gmail account is properly authorized
   - Service is not blocked or restricted

## Alternative: Test with EmailJS Test Feature

1. Go to your EmailJS template
2. Click **Test** button
3. Fill in test values for the variables
4. Send a test email
5. If test works, the issue is in the code/template variable matching
6. If test fails, the issue is in the EmailJS template configuration

## Still Having Issues?

1. **Check EmailJS Dashboard:**
   - Go to https://www.emailjs.com/
   - Check the **Activity** section for failed attempts
   - Look for detailed error messages

2. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Check the Console tab for detailed error messages
   - Look for the EmailJS configuration logs

3. **Verify Template Configuration:**
   - Make sure all template variables are spelled correctly
   - Check that "To Email" is set correctly (not as a variable)
   - Verify "Reply To" is set to `{{reply_to}}`

4. **Check EmailJS Documentation:**
   - https://www.emailjs.com/docs/
   - https://www.emailjs.com/docs/api/send/

## Quick Checklist

- [ ] Environment variables are set in `.env` file
- [ ] Development server was restarted after adding `.env` file
- [ ] EmailJS template includes all required variables
- [ ] Template variable names match exactly (case-sensitive)
- [ ] "To Email" is set to `priyanshupratap5622@gmail.com` in template settings
- [ ] "Reply To" is set to `{{reply_to}}` in template settings
- [ ] EmailJS service is connected and active
- [ ] Public Key is correct
- [ ] Service ID and Template ID are correct
- [ ] No extra spaces or characters in environment variables

