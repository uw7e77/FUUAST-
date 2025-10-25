// Initialize Chart.js for performance visualization
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
            datasets: [{
                label: 'Number of Students',
                data: [12, 15, 10, 5, 2, 1, 0],
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Navigation system (same as student portal)
// Notification handling
// Quick action button functionality
 