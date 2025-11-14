# How to Fix 412 Error in EmailJS

The **412 Precondition Failed** error means your EmailJS template configuration doesn't match what the code is sending.

## Quick Fix Steps:

### Step 1: Verify Your EmailJS Template

1. Go to https://dashboard.emailjs.com/admin/template
2. Find and open your template: `template_lu020mi`
3. Check the **Content** section

### Step 2: Update Template Content

Make sure your template **Content** includes EXACTLY these variables:

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

**Important:** Variable names are case-sensitive and must match exactly:
- `{{from_name}}` (not `{{fromName}}` or `{{name}}`)
- `{{from_email}}` (not `{{fromEmail}}` or `{{email}}`)
- `{{phone}}` (not `{{phoneNumber}}`)
- `{{message}}` (not `{{msg}}` or `{{content}}`)
- `{{reply_to}}` (not `{{replyTo}}`)

### Step 3: Configure Template Settings

In your EmailJS template settings (not in the email body):

1. **To Email:** 
   - Set to: `priyanshupratap5622@gmail.com`
   - This is a **fixed email address**, NOT a variable
   - This is where you'll receive the emails

2. **Reply To:** 
   - Set to: `{{reply_to}}`
   - This is a **template variable**
   - This allows you to reply directly to the sender

3. **Subject:** 
   - Set to: `New Contact Form Submission from AHDC Website`
   - Or use: `New Contact from {{from_name}}`

4. **From Name:** 
   - Can be: `AHDC Website` or `{{from_name}}`
   - Optional

5. **From Email:** 
   - This is usually set by your EmailJS service (Gmail)
   - Don't change this unless necessary

### Step 4: Save and Test

1. **Save** your template
2. Click **Test** button in EmailJS dashboard
3. Fill in test values:
   - `from_name`: Test Name
   - `from_email`: test@example.com
   - `phone`: 1234567890
   - `message`: Test message
   - `reply_to`: test@example.com
4. Send test email
5. Check if you receive the email at `priyanshupratap5622@gmail.com`

### Step 5: Verify Service Configuration

1. Go to **Email Services** in EmailJS dashboard
2. Check your service: `service_a291bgi`
3. Verify:
   - Service is **Connected** and **Active**
   - Gmail account is properly authorized
   - Service is not blocked

### Step 6: Restart Development Server

After making changes:

1. Stop your development server (Ctrl+C)
2. Restart it:
   ```bash
   npm run dev
   ```
3. Clear browser cache (Ctrl+Shift+R)
4. Test the form again

## Common Issues:

### Issue 1: Template Variables Don't Match
**Solution:** Make sure variable names in your EmailJS template EXACTLY match:
- `{{from_name}}`
- `{{from_email}}`
- `{{phone}}`
- `{{message}}`
- `{{reply_to}}`

### Issue 2: "To Email" Not Set
**Solution:** 
- Go to template settings
- Set "To Email" to `priyanshupratap5622@gmail.com`
- This is NOT a variable, but a fixed email address

### Issue 3: Template Not Saved
**Solution:** 
- Make sure you click **Save** after making changes
- Check that template is **Active**

### Issue 4: Service Not Connected
**Solution:**
- Go to Email Services
- Verify Gmail service is connected
- Re-authorize if necessary

## Still Having Issues?

Check the browser console for:
- EmailJS Configuration logs
- Template Params being sent
- Detailed error messages

The error message will tell you exactly what's wrong. Common fixes:
- Add missing variables to template
- Remove extra variables from template
- Check variable names match exactly (case-sensitive)
- Verify "To Email" is set correctly in template settings

