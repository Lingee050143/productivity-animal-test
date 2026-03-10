/**
 * script.js
 */

// 1. Data Definitions
const questions = [
    {
        q: "중요한 프로젝트가 시작되었을 때, 당신의 행동은?",
        a: [
            { text: "꼼꼼하게 세부 일정을 계획한다", type: "rabbit" },
            { text: "핵심 목표 하나에만 파고든다", type: "owl" },
            { text: "매일 조금씩 꾸준히 처리한다", type: "turtle" },
            { text: "나중에 한꺼번에 몰아서 처리한다", type: "cheetah" },
            { text: "마음이 가는 것부터 시작한다", type: "cat" }
        ]
    },
    {
        q: "당신이 가장 집중이 잘 되는 환경은?",
        a: [
            { text: "모든 것이 정돈된 깨끗한 책상", type: "rabbit" },
            { text: "아무도 없는 한적하고 조용한 곳", type: "owl" },
            { text: "정해진 시간에 앉는 나의 자리", type: "turtle" },
            { text: "마감이 임박한 긴장감 넘치는 곳", type: "cheetah" },
            { text: "색다른 영감을 주는 예쁜 카페", type: "cat" }
        ]
    },
    {
        q: "업무 도중 예상치 못한 문제가 발생하면?",
        a: [
            { text: "원인을 철저히 분석하고 기록한다", type: "rabbit" },
            { text: "해결될 때까지 밥도 안 먹고 매달린다", type: "owl" },
            { text: "당황하지 않고 평소 속도를 유지한다", type: "turtle" },
            { text: "엄청난 순발력으로 즉각 해결한다", type: "cheetah" },
            { text: "문제가 해결될 때까지 잠시 쉬어간다", type: "cat" }
        ]
    },
    {
        q: "당신이 일하는 방식을 한 단어로 표현한다면?",
        a: [
            { text: "완벽주의 (Quality)", type: "rabbit" },
            { text: "몰입 (Focus)", type: "owl" },
            { text: "성실 (Consistency)", type: "turtle" },
            { text: "번개 (Speed)", type: "cheetah" },
            { text: "영감 (Inspiration)", type: "cat" }
        ]
    },
    {
        q: "일이 끝난 후, 정산하는 방식은?",
        a: [
            { text: "결과물을 보며 보완할 점을 체크한다", type: "rabbit" },
            { text: "그 과정에서 얻은 인사이트를 정리한다", type: "owl" },
            { text: "오늘 분량을 다했는지 확인하고 쉰다", type: "turtle" },
            { text: "시원하게 털어버리고 바로 논다", type: "cheetah" },
            { text: "수고한 나를 위해 맛있는 것을 먹는다", type: "cat" }
        ]
    }
];

const results = {
    rabbit: {
        name: "완벽주의 토끼",
        image: "images/rabbit.png",
        desc: "세밀한 계획을 세우는 것을 좋아하며, 작은 디테일 하나도 놓치지 않는 꼼꼼함이 특징입니다. 퀄리티가 엄청나지만 가끔은 속도가 아쉬울 수 있어요!"
    },
    owl: {
        name: "집중형 올빼미",
        image: "images/owl.png",
        desc: "한 번 몰입하면 주변 소음도 듣지 못할 정도로 강력한 집중력을 발휘합니다. 혼자만의 시간을 가질 때 최고의 퍼포먼스를 내는 스타일이에요."
    },
    turtle: {
        name: "꾸준형 거북이",
        image: "images/turtle.png",
        desc: "속도보다는 방향! 매일 정해진 루틴을 충실하게 수행하는 성실함이 무기입니다. 장기 프로젝트에서 가장 믿음직스러운 에이스입니다."
    },
    cheetah: {
        name: "몰입형 치타",
        image: "images/cheetah.png",
        desc: "폭발적인 에너지를 한 순간에 쏟아부어 일을 끝내는 능력자입니다. 마감 직전에 발휘되는 당신의 초능력은 누구도 따라올 수 없어요."
    },
    cat: {
        name: "자유형 고양이",
        image: "images/cat.png",
        desc: "기분과 영감에 따라 일하는 스타일입니다. 틀에 박힌 계획보다는 직관적인 판단을 믿으며, 창의적인 분야에서 독보적인 결과를 만들어냅니다."
    }
};

// 2. State
let currentStep = 0;
let scores = { rabbit: 0, owl: 0, turtle: 0, cheetah: 0, cat: 0 };

// 3. UI Elements
const viewStart = document.getElementById('js-view-start');
const viewQuestion = document.getElementById('js-view-question');
const viewResult = document.getElementById('js-view-result');

const btnStart = document.getElementById('js-btn-start');
const btnRetry = document.getElementById('js-btn-retry');
const btnShare = document.getElementById('js-btn-share');

const questionText = document.getElementById('js-question-text');
const answerList = document.getElementById('js-answer-list');
const progressText = document.getElementById('js-progress-text');
const progressFill = document.getElementById('js-progress-fill');

const resultName = document.getElementById('js-result-name');
const resultImage = document.getElementById('js-result-image');
const resultDesc = document.getElementById('js-result-desc');

// 4. Core Logic
function init() {
    currentStep = 0;
    scores = { rabbit: 0, owl: 0, turtle: 0, cheetah: 0, cat: 0 };
    switchView('start');
}

function startTest() {
    switchView('question');
    renderQuestion();
}

function renderQuestion() {
    const total = questions.length;
    const currentQ = questions[currentStep];

    // Update Progress
    progressText.innerText = `Question ${currentStep + 1}/${total}`;
    progressFill.style.width = `${((currentStep + 1) / total) * 100}%`;

    // Update Question
    questionText.innerText = currentQ.q;

    // Render Answers
    answerList.innerHTML = '';
    currentQ.a.forEach(ans => {
        const button = document.createElement('button');
        button.className = 'btn btn--answer';
        button.innerText = ans.text;
        button.onclick = () => selectAnswer(ans.type);
        answerList.appendChild(button);
    });
}

function selectAnswer(type) {
    scores[type]++;
    
    if (currentStep < questions.length - 1) {
        currentStep++;
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    // Determine winner
    let maxScore = -1;
    let winner = 'rabbit';
    
    for (const type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            winner = type;
        }
    }

    const data = results[winner];
    resultName.innerText = data.name;
    resultImage.src = data.image;
    resultDesc.innerText = data.desc;

    switchView('result');
}

function switchView(viewName) {
    [viewStart, viewQuestion, viewResult].forEach(v => v.classList.add('u-hidden'));
    
    if (viewName === 'start') viewStart.classList.remove('u-hidden');
    if (viewName === 'question') viewQuestion.classList.remove('u-hidden');
    if (viewName === 'result') viewResult.classList.remove('u-hidden');
    
    window.scrollTo(0, 0);
}

// 5. Events
btnStart.addEventListener('click', startTest);
btnRetry.addEventListener('click', init);
btnShare.addEventListener('click', () => {
    alert('결과 링크가 복사되었습니다! (데모 기능)');
});

// Start
init();
