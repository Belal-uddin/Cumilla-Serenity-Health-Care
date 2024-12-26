{/* <script> */}
    document.addEventListener('DOMContentLoaded', () => {
        // Fetch data from the backend and draw the chart
        fetchAppointmentDataAndDrawChart();
    });

    async function fetchAppointmentDataAndDrawChart() {
        try {
            // Fetch the appointment status counts from the backend
            const response = await fetch('http://localhost:3000/appointment/statusCountForAllTime');

            // Handle non-200 responses
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const statusCounts = await response.json();

            // Ensure required data is available
            if (
                typeof statusCounts.pending === 'undefined' ||
                typeof statusCounts.accepted === 'undefined' ||
                typeof statusCounts.rejected === 'undefined' ||
                typeof statusCounts.seen === 'undefined' ||
                typeof statusCounts.absent === 'undefined'
            ) {
                throw new Error('Incomplete data received from backend');
            }

            // Draw the pie chart
            const ctx = document.getElementById('appointmentStatusChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Pending', 'Accepted', 'Rejected', 'Seen', 'Absent'],
                    datasets: [{
                        data: [
                            statusCounts.pending,
                            statusCounts.accepted,
                            statusCounts.rejected,
                            statusCounts.seen,
                            statusCounts.absent
                        ],
                        backgroundColor: [
                            '#ffcc00', // Pending
                            '#4caf50', // Accepted
                            '#f44336', // Rejected
                            '#2196f3', // Seen
                            '#9e9e9e', // Absent
                        ],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                },
            });
        } catch (error) {
            console.error('Error fetching or processing appointment data:', error);
            alert('Unable to load the chart. Please try again later.');
        }
    }
{/* </script> */}
