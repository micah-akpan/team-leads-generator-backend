const apiUrl = 'http://localhost:7777/api/users';

const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function getUsers () {
    return fetch(`${apiUrl}`, options)
      .then((response) => {
          return response.json()
      })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
          console.log(err);
      })
}

const teamMembersList = document.getElementById('team-members__list');
const teamLeader  = document.getElementById('team-lead__data__name');
const teamButton = document.getElementById('team-lead__generate-btn');

function createTeamListItems(teamMembers) {
    teamMembers.forEach((member) => {
        const li = document.createElement('li');
        li.textContent = member.name;
        li.classList.add('team-member__list__item');
        teamMembersList.appendChild(li);
    });
}

function pickTeamLead(teamMembers) {
    const availableMembers = teamMembers.filter((member) => {
        return !(member.served);
    });

    const randomNumber = Math.floor(Math.random() * availableMembers.length);
    return availableMembers[randomNumber];
}

function updateMemberRole(member, role='team lead') {
    return fetch(`${apiUrl}/${member.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role,
            served: true
        })
    })
    .then((response) => response.json())
    .then((response) => {
        const member = response.data[0];
        
    })
}

function getCurrentServingTeamLead(teamMembers) {
    return teamMembers.filter((member) => {
        const duration = new Date(member.termEndDate).getTime() - new Date().getTime();
        return (duration > 0 && member.served && member.role === 'team lead');
    });
}

teamButton.onclick = () => {
    getUsers()
      .then((users) => {
        const newTeamLead = pickTeamLead(users);
        console.log(newTeamLead);
      })
}

function setGenButtonState(teamMembers) {
    const hasActiveTeamLead = teamMembers.filter((teamMember) => {
        const memberEndDate = new Date(teamMember.termEndDate).getTime();
        const memberisActive = (memberEndDate - new Date().getTime() > 0 && teamMember.role === 'team lead' || teamMember.role === 'qa');
       return memberisActive
    })
    return hasActiveTeamLead;
}

window.onload = function() {
    getUsers()
      .then((users) => {
          createTeamListItems(users);

          const currentServingTL = getCurrentServingTeamLead(users);
          if (currentServingTL[0]) {
              teamLeader.textContent = currentServingTL[0].name
          }

          if (setGenButtonState(users)[0]) {
              teamButton.disabled = true;
          }
      })
      .catch((err) => {
          console.error(err);
      })
}