# ✅ **BugTracker Lite — Functional Requirements Roadmap**

## 1. **User Authentication & Authorization**

- Users can register an account.
- Users can log in using email + password.
- Authenticated users receive secure session/JWT.
- Users can log out.
- Role-based access:

  - **Admin** → manage users, projects, permissions.
  - **Developer** → work on assigned bugs/projects.
  - **Reporter** → create bug reports.

- Users can update their profile.

---

## 2. **Project Management**

- Create a new project (Admin/PM only).
- Edit project details.
- Archive / deactivate a project.
- View all projects or only assigned ones.
- Add or remove team members from a project.

---

## 3. **Issue / Bug Management**

- Create a new bug:

  - Title
  - Description
  - Steps to reproduce
  - Severity (Low/Medium/High/Critical)
  - Priority (Low/Medium/High)
  - Status (Open, In Progress, Resolved, Closed)
  - Attachments (screenshots)

- View all bugs.
- Filter bugs by:

  - Project
  - Severity
  - Priority
  - Reporter
  - Assignee
  - Status

- Assign a bug to a developer.
- Change bug status (with permission).
- Add comments to bugs.
- Upload/update attachments.
- Activity timeline automatically logs actions (status changes, comments, assignment changes).

---

## 4. **Dashboard & Insights**

- Summary of:

  - Total projects
  - Total bugs
  - Open / Closed bugs
  - Per-project bug count

- Charts/graphs (simple: bar, pie)
- Recent activity feed (e.g., “User X changed status…”)

---

## 5. **Notifications**

- Email/optional WhatsApp notification when:

  - A bug is assigned to someone.
  - A bug's status changes.
  - Someone comments on a bug.

- Notification preferences per user.

---

## 6. **Search & Filters**

- Global search (bugs/projects/users).
- Deep filters on bugs (multi-filter combo).
- Pagination/infinite scroll on tables for speed.

---

## 7. **Attachments**

- Upload screenshots (max size limit).
- Delete or update attachments.
- Preview attachments.

---

## 8. **User & Role Management (Admin Only)**

- Add new users.
- Deactivate/reactivate users.
- Assign roles (Admin / Developer / Reporter).
- View logs of user actions.

---

## 9. **Activity Log (Audit Trail)**

Every important action gets logged:

- Created bug
- Updated status
- Assigned developer
- Commented
- Changed project settings
  These logs appear:
- In bug details
- In admin dashboard

---

## 10. **Environment & Performance**

- Admin can configure:
  - File upload limits
  - Project visibility
  - Notification settings
- Responsive UI for desktop + mobile

---

## 11. **The Finishing Touch Features**

- Dark mode 🎨
- Real-time updates via WebSockets/Pusher
- Export bugs to PDF/CSV
- API keys for external integrations
- Simple Kanban board for drag-and-drop status changes
