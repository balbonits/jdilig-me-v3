# User Personas

## Primary Personas

### 1. Technical Recruiter - "Sarah"
**Profile**: Senior recruiter at tech companies, reviews 50+ portfolios weekly
**Time Available**: 30 seconds to 2 minutes per candidate
**Device**: 60% desktop, 40% mobile

**Goals:**
- Quickly assess skill match
- Download/share resume
- Contact promising candidates

**Needs:**
- Skills matrix with proficiency
- One-click resume download
- Clear contact info
- Fast-loading site

**Journey:**
1. Lands from LinkedIn (0-5s)
2. Scans skills/experience (5-30s)
3. Downloads resume if interested (30-45s)
4. Views 1-2 projects (45-90s)
5. Initiates contact (90-120s)

---

### 2. Hiring Manager - "David"
**Profile**: Engineering manager/tech lead, 10+ years coding experience
**Time Available**: 5-10 minutes for deep review
**Device**: 80% desktop, 20% mobile

**Goals:**
- Evaluate coding ability
- Review architecture decisions
- Assess culture fit

**Needs:**
- GitHub code access
- Technical explanations
- Problem-solving examples
- Modern tech stack evidence

**Journey:**
1. Arrives from recruiter email
2. Reviews skills in detail (0-3 min)
3. Deep dives into 3-5 projects (3-8 min)
4. Checks code quality on GitHub (8-10 min)
5. Makes hiring decision (10-12 min)

---

### 3. Potential Client - "Maria"
**Profile**: Non-technical founder seeking freelance help
**Time Available**: 5-7 minutes to build trust
**Device**: 50% mobile, 50% desktop

**Goals:**
- Find reliable developer
- See relevant work
- Establish trust

**Needs:**
- Similar project examples
- Plain English explanations
- Availability status
- Easy contact method

**Journey:**
1. Finds site via search/referral
2. Looks for similar projects (0-2 min)
3. Reads about section (2-4 min)
4. Checks credibility (4-5 min)
5. Initiates contact (5-7 min)

---

## Secondary Personas

### 4. Fellow Developer - "Alex"
**Goals**: Study implementation, find inspiration
**Needs**: Code access, technical details, modern patterns

### 5. Professional Network - "Jamie"
**Goals**: Check career progress, maintain connection
**Needs**: Professional summary, recent projects, social links

---

## Design Implications

### Navigation Priority
1. Resume button always visible (header)
2. Skills/projects above fold
3. Contact in multiple locations

### Content Strategy
- **Technical + Plain English** versions
- **Progressive disclosure**: Summary → Details
- **Scannable format**: Bullets, badges, clear hierarchy

### Performance Requirements
- Critical path: Hero → Skills → Resume
- Mobile-optimized touch targets (44px+)
- Lazy loading for below-fold content

### Accessibility
- Skip links for quick navigation
- WCAG AAA contrast for key text
- Keyboard navigation throughout