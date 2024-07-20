<template>
  <div class="schedule">
    <div class="heading-box">
      <header class="heading">League Standings</header>
    </div>
    <div class="table-box">
      <div class="table-header">
        <div class="table-header-text-left">
          <div>Team Name</div>
        </div>
        <div class="table-header-text-right">
          <div>MP</div>
          <div>GF</div>
          <div>GA</div>
          <div>Points</div>
        </div>
      </div>
      <div class="table-body">
        <div class="table-body-date">
          <div>Flag</div>
          <div>Team Name</div>
        </div>
        <div class="table-body-info">
          <div>3</div>
          <div>3</div>
          <div>3</div>
          <div>3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.schedule {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: lightseagreen;
}

.heading-box {
  color: #182c62;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.table-box {
  width: 90%;
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #4b5c68;
}

.table-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 40px;
  border: #e4edf2;
  width: 100%;
  background-color: #e4edf2;
  font-size: 12px;
}

.table-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 70px;
  width: 100%;
  color: #4b5c68;
}

.table-body:nth-child(odd) {
  background-color: #f6f7f7;
}

.table-body-date {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 50%;
}

.table-body-info {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 50%;
}

.table-header-text-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: #4b5c68;
  font-size: 12px;
  background-color: lightpink;
  height: 100%;
  width: 100%;
}

.table-header-text-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: #4b5c68;
  font-size: 12px;
  background-color: lightblue;
  height: 100%;
  width: 100%;
}
</style>
