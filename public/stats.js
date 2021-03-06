fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  function labelForDayOfTheWeek(data) {

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const labels = [];

    data.forEach(workout => {
      if (workout.exercises.length > 0) {

        const dayOfTheWeek = new Date(workout.day).getDay();
        const month = new Date(workout.day).getMonth() + 1;
        const date = new Date(workout.day).getDate();
        labels.push(`${days[dayOfTheWeek]} ${[month]}/${[date]}`);

      }
    });

    return labels;

  }

  let dayLabels = labelForDayOfTheWeek(data);

  let lineChart = new Chart(line, {
    type: "line",
    data: {

      labels: dayLabels,

      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Total Duration Per Workout"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {

    type: "bar",
    data: {

      labels: dayLabels,

      datasets: [
        {
          label: "Weight In Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted Per Workout"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {

    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Total Active Minutes Per Exercise Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Active Minutes Per Exercise Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {

    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Total Pounds Lifted Per Resistance Exercise",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Pounds Lifted Per Resistance Exercise"
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {

    if (workout.exercises.length > 0) {
      durations.push(workout.totalDuration)
    }
    // workout.exercises.forEach(exercise => {
    //   durations.push(exercise.duration);
    // });
  });

  return durations;
}

function calculateTotalWeight(data) {

  let total = [];


  data.forEach(workout => {

    if (workout.exercises.length > 0) {

      const totalWeight = workout.exercises.reduce((total, exercise) => {
        return total + exercise.weight
      }, 0);

      total.push(totalWeight);
    };

    // workout.exercises.forEach(exercise => {
    //   total.push(exercise.weight);
    // });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}