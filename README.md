# Career Path Analyzer

A lightweight full-stack app to help users discover personalized learning roadmaps and skill gaps for common developer roles.

**Key idea:** enter your current skills and a target role, and the app returns missing skills, recommendations, and a suggested roadmap.

---

**Why this is useful**

- **Quick gap analysis:** compares your current skills to role-specific requirements and returns missing skills and recommendations.
- **Personalized roadmaps:** phased learning plans tailored to the chosen role and filtered by skills you already know.
- **Live tech news:** pulls top stories from Hacker News to keep learning resources fresh.

---

**Repo layout (important paths)**

- `backend/` — Express + TypeScript API, routes in `backend/src/routes/` and role data in `backend/src/data/roles.json`.
- `frontend/` — React + Vite UI built with TypeScript and Radix/Tailwind primitives in `frontend/src/`.

---

**Getting started (developer)**

Prerequisites: Node.js (>=18 recommended) and npm. This project is tested locally with Windows PowerShell; commands below use PowerShell syntax.

1) Install dependencies for both services

```powershell
# from repository root
cd backend; npm install; cd ../frontend; npm install; cd ..
```

2) Run the backend (development)

```powershell
# starts the TS dev server (watch)
cd backend
npm run dev
```

Backend defaults to port `5000`. Open `http://localhost:5000/` to verify.

3) Run the frontend (development)

```powershell
cd frontend
npm run dev
```

Vite will print the local dev URL (usually `http://localhost:5173`). The front-end will call the backend API endpoints to perform analysis.

4) Build & production

```powershell
# build backend (TypeScript) then frontend
cd backend
npm run build
cd ../frontend
npm run build
```

After building the backend, start it with `npm run start` from `backend/`.

---

**API / Usage examples**

The backend exposes a few simple endpoints used by the frontend:

- `POST /api/skill-gap` — body: `{ "targetRole": string, "currentSkills": string[] }` — returns matched and missing skills plus recommendations.
- `POST /api/roadmap` — body: `{ "targetRole": string, "currentSkills": string[] }` — returns a phased roadmap filtered by known skills.
- `GET /api/hackernews` — returns top Hacker News items (top 5).

Example curl request (skill-gap):

```bash
curl -X POST http://localhost:5000/api/skill-gap \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"Backend Developer","currentSkills":["Java","Git"]}'
```

Example response (abridged):

```json
{
  "targetRole":"Backend Developer",
  "matchedSkills":["Java","Git"],
  "missingSkills":["Spring Boot","SQL","APIs"],
  "recommendations":["Learn Spring Boot and build a small project.", ...]
}
```

---

**Development notes & data sources**

- Role skill definitions are stored in `backend/src/data/roles.json` and are used to compute matches and missing items.
- Roadmaps are defined inline in `backend/src/routes/roadmap.ts` and are returned with phases and items; the frontend filters out skills the user already knows.
- Hacker News data is fetched live via the official Firebase API in `backend/src/routes/news.ts`.

---

**Where to get help**

- Open an issue in this repository for bugs or feature requests.
- For contribution guidelines, see `CONTRIBUTING.md` (create this file if you'd like to add onboarding instructions).

---

**Maintainers & Contributing**

- Maintainer: repository owner `Mayankax` (see GitHub profile).
- Contributions: fork the repo, create a topic branch, and open a pull request. Keep changes focused and add tests or screenshots for UI changes where relevant.
- Please add a `CONTRIBUTING.md` and `LICENSE` file if you intend to accept external contributions.

---

**Quick checklist for first PR**

- [ ] Run `npm run lint` in `frontend/` and ensure no new lint errors.
- [ ] Keep TypeScript types and build passing for the backend (`npm run build`).
- [ ] Update `README.md` or docs for any new user-facing behavior.

---

If you'd like, I can also:

- add a minimal `CONTRIBUTING.md` and `ISSUE_TEMPLATE.md`.
- set up a simple `Dockerfile` for the backend or both services.

Want me to commit the README now and add a `CONTRIBUTING.md` next?
