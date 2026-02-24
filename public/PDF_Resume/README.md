# Resume PDF for live site

**To update your resume on the live site:**

1. Replace `Vaibhav_Chandgir_Resume.pdf` in this folder with your new PDF (keep the same filename),  
   **or** add a new PDF and update the link in `src/pages/HomePage.tsx`.

2. Commit and push to `main`:
   ```bash
   git add public/PDF_Resume/
   git commit -m "Update resume PDF"
   git push
   ```

3. GitHub Actions will build and deploy. In a minute or two, the live site will serve the new file at:
   `https://vaibhavsadgir50.github.io/portfolio2026/PDF_Resume/Vaibhav_Chandgir_Resume.pdf`

Files in `public/` are copied into the build output, so whatever PDF you put here is what the live site serves.
