const RANK_STYLES = [
  {bg:'#085041',border:'#085041',text:'#9FE1CB',badgeBg:'#085041',badgeText:'#9FE1CB',label:'1st'},
  {bg:'#5DCAA5',border:'#1D9E75',text:'#04342C',badgeBg:'#1D9E75',badgeText:'#E1F5EE',label:'2nd'},
  {bg:'#EF9F27',border:'#BA7517',text:'#412402',badgeBg:'#BA7517',badgeText:'#FAEEDA',label:'3rd'},
  {bg:'#F0997B',border:'#D85A30',text:'#4A1B0C',badgeBg:'#D85A30',badgeText:'#FAECE7',label:'4th'},
];

const SCORE_MAP = [4,3,2,1];

const questions = [
  {text:"During team meetings, I usually:",opts:["provide the team with technical data or information.","keep the team focused on our mission or goals.","make sure everyone is involved in the discussion.","raise questions about our goals or methods."]},
  {text:"In relating to the team leader, I:",opts:["suggest that our work be goal directed.","try to help her build a positive team climate.","am willing to disagree with her when necessary.","offer advice based upon my area of expertise."]},
  {text:"Under stress, I sometimes:",opts:["overuse humor and other tension-reducing devices.","am too direct in communicating with other team members.","lose patience with the need to get everyone involved in discussions.","complain to outsiders about problems facing the team."]},
  {text:"When conflicts arise on the team, I usually:",opts:["press for an honest discussion of the differences.","provide reasons why one side or the other is correct.","see the differences as a basis for possible changes in team direction.","try to break the tension with a supportive or humorous remark."]},
  {text:"Other team members usually see me as:",opts:["factual.","flexible.","encouraging.","candid."]},
  {text:"At times, I am:",opts:["too results oriented.","too laid-back.","self-righteous.","shortsighted."]},
  {text:"When things go wrong on the team, I usually:",opts:["push for increased emphasis on listening, feedback, and participation.","press for a candid discussion of our problems.","work hard to provide more and better information.","suggest that we revisit our basic mission."]},
  {text:"A risky team contribution to me is to:",opts:["question some aspect of the team’s work.","push the team to set higher performance standards.","work outside my defined role or job area.","provide other team members with feedback on their behavior as team members."]},
  {text:"Sometimes other team members see me as:",opts:["a perfectionist.","unwilling to reassess the team’s mission or goals.","not serious about getting the real job done.","a nitpicker."]},
  {text:"I believe team problem-solving requires:",opts:["cooperation by all team members.","high-level listening skills.","a willingness to ask tough questions.","good solid data."]},
  {text:"When a new team is forming, I usually:",opts:["try to meet and get to know other team members.","ask pointed questions about our goals and methods.","want to know what is expected of me.","seek clarity about our basic mission."]},
  {text:"At times, I make other people feel:",opts:["dishonest because they are not able to be as confrontational as I am.","guilty because they don’t live up to my standards.","small-minded because they don’t think long-range.","heartless because they don’t care about how people relate to each other."]},
  {text:"I believe the role of the team leader is to:",opts:["ensure the efficient solution of business problems.","help the team establish long-range goals and short-term objectives","create a participatory decision-making climate.","bring out diverse ideas and challenge assumptions."]},
  {text:"I believe team decisions should be based on:",opts:["the team’s mission and goals.","a consensus of team members.","an open and candid assessment of the issues.","the weight of the evidence."]},
  {text:"Sometimes I:",opts:["see team climate as an end in itself.","play devil’s advocate far too long.","fail to see the importance of effective team process.","overemphasize strategic issues and minimize short-term task accomplishments."]},
  {text:"People have often described me as:",opts:["independent.","dependable.","imaginative.","participative."]},
  {text:"Most of the time, I am:",opts:["responsible and hardworking.","committed and flexible.","enthusiastic and humorous.","honest and authentic."]},
  {text:"In relating to other team members, at times I get annoyed because they don’t:",opts:["revisit team goals to check progress.","see the importance of working well together.","object to team actions with which they disagree.","complete their team assignments on time."]},
];

const STYLES = [
  {name:"Contributor",short:"Contributor"},
  {name:"Collaborator",short:"Collaborator"},
  {name:"Communicator",short:"Communicator"},
  {name:"Challenger",short:"Challenger"},
];

const STYLE_MAP = [
  [0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2],
  [0, 1, 2, 3], [0, 1, 3, 2], [2, 3, 0, 1], [3, 0, 1, 2],
  [0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2],
  [0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2],
  [0, 1, 2, 3], [1, 2, 3, 0]
];

const DESCS = {
  "Contributor":"You are a task-oriented team member who enjoys providing technical information, helping the team set high standards, and pushing for high-quality results.",
  "Collaborator":"You are a goal-oriented member who sees the big picture, helps the team stay focused on its mission, and is willing to work outside your defined role.",
  "Communicator":"You are a process-oriented member who focuses on group dynamics, ensuring everyone is involved, and resolving interpersonal conflicts to maintain a positive climate.",
  "Challenger":"You are a questioning member who is willing to disagree with the leader and the team, pushing the group to take risks and be more creative."
};

let rankings = questions.map(() => []);
let barInst = null, radarInst = null;

function applyStyle(btn, rankIndex) {
  const r = RANK_STYLES[rankIndex];
  btn.style.background = r.bg;
  btn.style.borderColor = r.border;
  const badge = btn.querySelector('.rank-badge');
  badge.style.background = r.badgeBg;
  badge.style.borderColor = r.badgeBg;
  badge.style.color = r.badgeText;
  badge.textContent = r.label;
  btn.querySelector('.opt-text').style.color = r.text;
  btn.querySelector('.opt-label-letter').style.color = r.text;
  btn.querySelector('.rank-hint').textContent = '';
}

function clearStyle(btn, remaining) {
  btn.style.background = '';
  btn.style.borderColor = '';
  const badge = btn.querySelector('.rank-badge');
  badge.style.background = 'transparent';
  badge.style.borderColor = '#ddd';
  badge.style.color = '#bbb';
  badge.textContent = '';
  btn.querySelector('.opt-text').style.color = '#1a1a1a';
  btn.querySelector('.opt-label-letter').style.color = '#bbb';
  btn.querySelector('.rank-hint').textContent = remaining > 0 ? remaining + ' to rank' : 'Ranked';
}

function clickOption(qi, oi) {
  const r = rankings[qi];
  const existingPos = r.indexOf(oi);
  const card = document.getElementById('qc-' + qi);
  const btns = card.querySelectorAll('.opt-btn');

  if (existingPos !== -1) {
    r.splice(existingPos, 1);
    btns.forEach(b => {
      const bOi = parseInt(b.dataset.oi);
      const bPos = r.indexOf(bOi);
      if (bPos !== -1) {
        applyStyle(b, bPos);
      } else {
        clearStyle(b, 4 - r.length);
      }
    });
  } else {
    if (r.length >= 4) return;
    r.push(oi);
    applyStyle(btns[oi], r.length - 1);
    btns.forEach(b => {
      if (!r.includes(parseInt(b.dataset.oi))) {
        clearStyle(b, 4 - r.length);
      }
    });
  }
  updateProgress();
}

function updateProgress() {
  const done = rankings.filter(r => r.length === 4).length;
  const pct = Math.round((done / 18) * 100);
  document.getElementById('progFill').style.width = pct + '%';
  document.getElementById('progLbl').textContent = done + ' of 18 questions fully ranked';
}

function renderQuestions() {
  const list = document.getElementById('qList');
  list.innerHTML = '';
  const letters = ['a','b','c','d','e'];
  questions.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'q-card';
    card.id = 'qc-' + qi;
    const optsHtml = q.opts.map((opt, oi) => `
      <button class="opt-btn" data-qi="${qi}" data-oi="${oi}" onclick="clickOption(${qi},${oi})">
        <div class="rank-badge"></div>
        <span class="opt-label-letter">${letters[oi]}.</span>
        <span class="opt-text">${opt}</span>
        <span class="rank-hint">${oi === 0 ? '4 to rank' : ''}</span>
      </button>
    `).join('');
    card.innerHTML = `
      <div class="q-meta">Question ${qi+1} of 18</div>
      <div class="q-text">${qi+1}. ${q.text}</div>
      <div class="options">${optsHtml}</div>
    `;
    list.appendChild(card);
  });
}

function calcScores() {
  const scoreTotals = [0, 0, 0, 0];
  rankings.forEach((r, qi) => {
    r.forEach((optIdx, rankIdx) => {
      const styleIdx = STYLE_MAP[qi][optIdx];
      scoreTotals[styleIdx] += SCORE_MAP[rankIdx];
    });
  });
  return STYLES.map((s, idx) => {
    return { name: s.name, short: s.short, score: scoreTotals[idx] };
  });
}

function submitAll() {
  const incomplete = [];
  rankings.forEach((r, i) => { if (r.length < 4) incomplete.push(i+1); });
  if (incomplete.length > 0) {
    const msg = document.getElementById('errMsg');
    msg.style.display = 'block';
    msg.textContent = incomplete.length + ' question(s) not fully ranked: Q' + incomplete.slice(0,10).join(', Q') + (incomplete.length > 10 ? '...' : '');
    document.getElementById('qc-' + (incomplete[0]-1)).scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }
  showResults();
}

function showResults() {
  document.getElementById('mainView').style.display = 'none';
  document.getElementById('resultsView').style.display = 'block';
  const scores = calcScores();
  const maxScore = Math.max(...scores.map(s => s.score));
  const top = scores.find(s => s.score === maxScore);
  document.getElementById('scoreGrid').innerHTML = scores.map(s => `
    <div class="sc">
      <div class="sc-name">${s.name}</div>
      <div class="sc-val">${s.score} <span class="sc-max">/ 72</span></div>
      ${s.score === maxScore ? '<div class="top-pill">Top Style</div>' : ''}
    </div>
  `).join('');
  document.getElementById('descBox').innerHTML = `
    <h3>Your Dominant Style: ${top.name}</h3>
    <p>${DESCS[top.name]}</p>
  `;
  renderBarChart(scores);
  window.scrollTo(0,0);
}

const CHART_BG  = ['#E6F1FB','#E1F5EE','#FAEEDA','#FAECE7','#EAF3DE','#9FE1CB','#FBEAF0','#EEEDFE'];
const CHART_BD  = ['#185FA5','#1D9E75','#854F0B','#993C1D','#3B6D11','#0F6E56','#993556','#534AB7'];

function renderBarChart(scores) {
  if (barInst) barInst.destroy();
  barInst = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: scores.map(s => s.short),
      datasets: [{
        label: 'Score',
        data: scores.map(s => s.score),
        backgroundColor: CHART_BG,
        borderColor: CHART_BD,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 72, ticks: { stepSize: 10, font: { size: 11 } }, grid: { color: 'rgba(0,0,0,0.06)' } },
        x: { ticks: { font: { size: 11 }, autoSkip: false } }
      }
    }
  });
}

function renderRadarChart(scores) {
  if (radarInst) radarInst.destroy();
  radarInst = new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: scores.map(s => s.name),
      datasets: [{
        label: 'Your profile',
        data: scores.map(s => s.score),
        backgroundColor: 'rgba(29,158,117,0.12)',
        borderColor: '#1D9E75',
        borderWidth: 2,
        pointBackgroundColor: '#1D9E75',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 72,
          ticks: { stepSize: 10, font: { size: 10 }, backdropColor: 'transparent' },
          pointLabels: { font: { size: 12 } },
          grid: { color: 'rgba(0,0,0,0.08)' }
        }
      }
    }
  });
}

function showTab(tab) {
  const scores = calcScores();
  if (tab === 'bar') {
    document.getElementById('barWrap').style.display = 'block';
    document.getElementById('radarWrap').style.display = 'none';
    document.getElementById('tBar').classList.add('on');
    document.getElementById('tRadar').classList.remove('on');
  } else {
    document.getElementById('barWrap').style.display = 'none';
    document.getElementById('radarWrap').style.display = 'block';
    document.getElementById('tBar').classList.remove('on');
    document.getElementById('tRadar').classList.add('on');
    renderRadarChart(scores);
  }
}

function resetAll() {
  rankings = questions.map(() => []);
  if (barInst) { barInst.destroy(); barInst = null; }
  if (radarInst) { radarInst.destroy(); radarInst = null; }
  document.getElementById('resultsView').style.display = 'none';
  document.getElementById('mainView').style.display = 'block';
  document.getElementById('errMsg').style.display = 'none';
  renderQuestions();
  updateProgress();
  window.scrollTo(0,0);
}

renderQuestions();