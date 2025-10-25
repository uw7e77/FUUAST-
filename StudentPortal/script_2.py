
# Append Part 2 of CSS
student_portal_css_part2 = '''

/* =============================================
   DASHBOARD CONTENT
   ============================================= */

.dashboard-content {
    padding: 2rem;
}

/* Welcome Section */
.welcome-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.welcome-content h1 {
    font-size: 2rem;
    color: var(--gray-900);
    margin-bottom: 0.5rem;
}

.welcome-content p {
    font-size: 1rem;
    color: var(--gray-600);
}

.semester-info {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.semester-badge {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: var(--white);
    border-radius: var(--radius-md);
    font-weight: 600;
}

.cgpa-display {
    padding: 0.5rem 1rem;
    background: var(--white);
    border: 2px solid var(--success-color);
    color: var(--success-color);
    border-radius: var(--radius-md);
    font-weight: 600;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: var(--white);
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: var(--transition);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: var(--white);
}

.stat-icon.blue { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.green { background: linear-gradient(135deg, #28a745, #20c997); }
.stat-icon.orange { background: linear-gradient(135deg, #ff6b35, #ffc107); }
.stat-icon.purple { background: linear-gradient(135deg, #764ba2, #667eea); }

.stat-info h3 {
    font-size: 2rem;
    color: var(--gray-900);
    margin-bottom: 0.25rem;
}

.stat-info p {
    font-size: 0.9375rem;
    color: var(--gray-600);
}

/* Dashboard Grid */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
}

/* Dashboard Cards */
.dashboard-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: var(--transition);
}

.dashboard-card:hover {
    box-shadow: var(--shadow-md);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--gray-200);
}

.card-header h3 {
    font-size: 1.125rem;
    color: var(--gray-900);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-header h3 i {
    color: var(--primary-color);
}

.view-all {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    transition: var(--transition);
}

.view-all:hover {
    color: var(--primary-dark);
}

.card-content {
    padding: 1.5rem;
}

/* Schedule Items */
.schedule-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-200);
    margin-bottom: 1rem;
    transition: var(--transition);
}

.schedule-item:last-child {
    margin-bottom: 0;
}

.schedule-item:hover {
    background: var(--gray-50);
    border-color: var(--primary-color);
}

.schedule-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
}

.schedule-time .time {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--gray-900);
}

.schedule-time .duration {
    font-size: 0.75rem;
    color: var(--gray-600);
}

.schedule-details {
    flex: 1;
}

.schedule-details h4 {
    font-size: 1rem;
    color: var(--gray-900);
    margin-bottom: 0.5rem;
}

.schedule-details p {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.25rem;
}

.schedule-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
}

.schedule-status.ongoing {
    background: rgba(40, 167, 69, 0.1);
    color: var(--success-color);
}

.schedule-status.upcoming {
    background: rgba(0, 102, 204, 0.1);
    color: var(--primary-color);
}

/* Assignment Items */
.assignment-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-200);
    margin-bottom: 1rem;
    transition: var(--transition);
}

.assignment-item:last-child {
    margin-bottom: 0;
}

.assignment-item:hover {
    background: var(--gray-50);
    border-color: var(--primary-color);
}

.assignment-item.urgent {
    border-color: var(--danger-color);
    background: rgba(220, 53, 69, 0.05);
}

.assignment-icon {
    width: 50px;
    height: 50px;
    border-radius: var(--radius-md);
    background: rgba(0, 102, 204, 0.1);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.assignment-details {
    flex: 1;
}

.assignment-details h4 {
    font-size: 1rem;
    color: var(--gray-900);
    margin-bottom: 0.25rem;
}

.assignment-details p {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.5rem;
}

.assignment-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.due-date {
    font-size: 0.875rem;
    color: var(--gray-600);
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.priority {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 600;
}

.priority.urgent {
    background: rgba(220, 53, 69, 0.1);
    color: var(--danger-color);
}

.priority.medium {
    background: rgba(255, 193, 7, 0.1);
    color: var(--warning-color);
}

.priority.low {
    background: rgba(40, 167, 69, 0.1);
    color: var(--success-color);
}

/* Progress Items */
.progress-item {
    margin-bottom: 1.5rem;
}

.progress-item:last-child {
    margin-bottom: 0;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.course-info h4 {
    font-size: 1rem;
    color: var(--gray-900);
    margin-bottom: 0.25rem;
}

.course-code {
    font-size: 0.75rem;
    color: var(--gray-600);
}

.progress-percent {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--primary-color);
}

.progress-bar {
    height: 8px;
    background: var(--gray-200);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
    border-radius: var(--radius-full);
    transition: width 1s ease;
}

/* Grade Items */
.grade-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-200);
    margin-bottom: 1rem;
    transition: var(--transition);
}

.grade-item:last-child {
    margin-bottom: 0;
}

.grade-item:hover {
    background: var(--gray-50);
}

.grade-icon {
    width: 50px;
    height: 50px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--white);
    flex-shrink: 0;
}

.grade-icon.grade-a {
    background: linear-gradient(135deg, #28a745, #20c997);
}

.grade-icon.grade-b {
    background: linear-gradient(135deg, #17a2b8, #20c997);
}

.grade-details h4 {
    font-size: 1rem;
    color: var(--gray-900);
    margin-bottom: 0.25rem;
}

.grade-details p {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.25rem;
}

.grade-date {
    font-size: 0.75rem;
    color: var(--gray-500);
}

/* Announcement Items */
.announcement-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-200);
    margin-bottom: 1rem;
    transition: var(--transition);
}

.announcement-item:last-child {
    margin-bottom: 0;
}

.announcement-item:hover {
    background: var(--gray-50);
}

.announcement-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 102, 204, 0.1);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    flex-shrink: 0;
}

.announcement-content h4 {
    font-size: 1rem;
    color: var(--gray-900);
    margin-bottom: 0.25rem;
}

.announcement-content p {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.5rem;
}

.announcement-date {
    font-size: 0.75rem;
    color: var(--gray-500);
}

/* Quick Actions */
.quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
}

.quick-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: var(--gray-700);
    transition: var(--transition);
}

.quick-action-btn:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.quick-action-btn i {
    font-size: 2rem;
}

.quick-action-btn span {
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
}

/* =============================================
   RESPONSIVE DESIGN
   ============================================= */

@media screen and (max-width: 1200px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}

@media screen and (max-width: 768px) {
    :root {
        --sidebar-width: 280px;
    }

    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.active {
        transform: translateX(0);
    }

    .sidebar-toggle {
        display: block;
    }

    .main-wrapper {
        margin-left: 0;
    }

    .mobile-toggle {
        display: flex;
    }

    .top-header {
        padding: 0 1rem;
    }

    .header-search {
        display: none;
    }

    .dashboard-content {
        padding: 1rem;
    }

    .welcome-section {
        flex-direction: column;
        align-items: flex-start;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .dashboard-grid {
        grid-template-columns: 1fr;
    }

    .notification-dropdown,
    .user-dropdown {
        right: -50px;
    }
}

@media screen and (max-width: 480px) {
    .schedule-item {
        flex-direction: column;
    }

    .assignment-item {
        flex-direction: column;
    }

    .quick-actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* =============================================
   ANIMATIONS
   ============================================= */

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dashboard-card {
    animation: fadeIn 0.5s ease-out backwards;
}

.dashboard-card:nth-child(1) { animation-delay: 0.1s; }
.dashboard-card:nth-child(2) { animation-delay: 0.2s; }
.dashboard-card:nth-child(3) { animation-delay: 0.3s; }
.dashboard-card:nth-child(4) { animation-delay: 0.4s; }
.dashboard-card:nth-child(5) { animation-delay: 0.5s; }
.dashboard-card:nth-child(6) { animation-delay: 0.6s; }

/* =============================================
   UTILITY CLASSES
   ============================================= */

.no-scroll {
    overflow: hidden;
}'''

# Append Part 2 to existing file
with open('student-portal.css', 'a', encoding='utf-8') as f:
    f.write(student_portal_css_part2)

print("✅ Student Portal CSS completed!")
print("📝 File: student-portal.css (Complete)")
