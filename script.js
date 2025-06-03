const questions = [
      "In the last month, how often have you felt upset because of something that happened unexpectedly?",
      "In the last month, how often have you felt unable to control important things in your life?",
      "In the last month, how often have you felt nervous or 'stressed'?",
      "In the last month, how often have you felt confident about your ability to handle personal problems?",
      "In the last month, how often have you found that you could not cope with all the things you had to do?",
      "Do you often feel overwhelmed with your workload?",
      "Do you find it hard to relax after working hours?",
      "Do you feel your job/studies give you very little control?",
      "Do you experience conflict with coworkers, clients, or teammates regularly?",
      "Do you feel that your efforts are not recognized or appreciated?",
      "Do you frequently suffer from headaches, muscle tension, or fatigue?",
      "Do you feel tired even after a full night's sleep?",
      "Do you have sudden mood changes or feel irritated easily?",
      "Do you experience racing thoughts or restlessness?",
      "Do you feel like avoiding people or withdrawing socially?",
      "Do you feel supported by your friends and family?",
      "Do you have healthy ways to cope with stress (exercise, hobbies, etc.)?",
      "When stressed, do you tend to overeat, drink, or smoke?",
      "Can you talk openly to someone about your problems?",
      "Do you often ignore your emotions or suppress them?",
      "Do you feel emotionally drained by your responsibilities?",
      "Do you feel you've become less effective in your work or studies?",
      "Do you experience a loss of interest or motivation?",
      "Do you feel detached or cynical about your job/life?",
      "Do you find no time for rest, relaxation, or enjoyment?"
    ];

    const answers = [];
    let currentQuestion = 0;

    function updateProgress() {
      const progress = (currentQuestion / questions.length) * 100;
      document.getElementById('progressFill').style.width = progress + '%';
    }

    function showQuestion() {
      const quizDiv = document.getElementById("quiz");
      quizDiv.innerHTML = `
        <div class="question-card">
          <div class="question-number">Question ${currentQuestion + 1} of ${questions.length}</div>
          <div class="question-text">${questions[currentQuestion]}</div>
          <div class="options">
            <div class="option" onclick="selectOption(this, 0)">
              <input type="radio" name="answer" value="0" id="opt0" />
              <label for="opt0">Never</label>
            </div>
            <div class="option" onclick="selectOption(this, 1)">
              <input type="radio" name="answer" value="1" id="opt1" />
              <label for="opt1">Rarely</label>
            </div>
            <div class="option" onclick="selectOption(this, 2)">
              <input type="radio" name="answer" value="2" id="opt2" />
              <label for="opt2">Sometimes</label>
            </div>
            <div class="option" onclick="selectOption(this, 3)">
              <input type="radio" name="answer" value="3" id="opt3" />
              <label for="opt3">Often</label>
            </div>
            <div class="option" onclick="selectOption(this, 4)">
              <input type="radio" name="answer" value="4" id="opt4" />
              <label for="opt4">Always</label>
            </div>
          </div>
          <button class="nav-button" id="nextBtn" onclick="nextQuestion()" disabled>
            ${currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
          </button>
        </div>
      `;
      
      updateProgress();
    }

    function selectOption(element, value) {
      // Remove selected class from all options
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      element.classList.add('selected');
      
      // Check the radio button
      element.querySelector('input').checked = true;
      
      // Enable next button
      document.getElementById('nextBtn').disabled = false;
    }

    function nextQuestion() {
      const selected = document.querySelector("input[name='answer']:checked");
      if (!selected) {
        alert("Please select an answer.");
        return;
      }
      
      answers.push(parseInt(selected.value));
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showLoadingAndResult();
      }
    }

    function showLoadingAndResult() {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("loading").style.display = "block";
      
      setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        showResult();
      }, 3000); // 3 second loading
    }

    function showResult() {
      const total = answers.reduce((a, b) => a + b, 0);
      let level = "";
      let description = "";
      
      if (total <= 20) {
        level = "Low Stress Level";
        description = "Your stress levels appear to be manageable.";
      } else if (total <= 40) {
        level = "Moderate Stress Level";
        description = "You're experiencing some stress that could benefit from attention.";
      } else if (total <= 60) {
        level = "High Stress Level";
        description = "Your stress levels are elevated and need active management.";
      } else if (total <= 80) {
        level = "Very High Stress Level";
        description = "You're experiencing significant stress that requires immediate attention.";
      } else {
        level = "Chronic Stress / Burnout Risk";
        description = "You may be at risk of burnout and should seek professional support.";
      }

      const resultDiv = document.getElementById("result");
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        <div class="result-card">
          <div class="stress-level">${level}</div>
          <div class="score">Total Score: ${total} out of 100</div>
          <p>${description}</p>
        </div>
        
        <div class="encouragement">
          <h3> Don't Worry About Your Stress - Any Level!</h3>
          <p>
            I have all the solutions to manage and <strong>treat your stress</strong>. 
            Read through comprehensive articles that provide real solutions. Don't worry - 
            my articles are not full of jargon or frustrating content that adds more stress. 
            Just read them with confidence knowing you'll find practical, easy-to-understand 
            guidance for managing your stress effectively.
          </p>
          
          <button class="restart-button" onclick="restartQuiz()">Take Assessment Again</button>
        </div>
      `;
    }

    function restartQuiz() {
      answers.length = 0;
      currentQuestion = 0;
      document.getElementById("result").style.display = "none";
      document.getElementById("quiz").style.display = "block";
      showQuestion();
    }

    // Fullscreen functionality
    function toggleFullscreen() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
        // Enter fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
      }
    }

    // Update fullscreen button icon based on state
    function updateFullscreenButton() {
      const btn = document.getElementById('fullscreenBtn');
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        btn.innerHTML = '⛶'; // Exit fullscreen icon
        btn.title = 'Exit Fullscreen';
      } else {
        btn.innerHTML = '⛶'; // Enter fullscreen icon
        btn.title = 'Enter Fullscreen';
      }
    }

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);

    // Initialize the quiz
    showQuestion();