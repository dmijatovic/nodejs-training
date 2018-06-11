
export const userProfile={
  template:`
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-12 alert" 
          :class="notification.type" role="alert">
        {{notification.msg}}
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="form-group row">
          <label for="inputUser" class="col-md-2 col-sm-6 col-form-label">Username</label>
          <div class="col-md-10 col-sm-6">
            <input type="text" 
              class="form-control" 
              id="inputUser" placeholder="username"
              v-model="userName">
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-check">
          <input class="form-check-input" 
            type="checkbox" id="gridCheck"
            v-model="shareLocation">
          <label class="form-check-label" for="gridCheck">
            Share location
          </label>
        </div>
      </div>
    </div>
    
  </section>`,
  props:{
    userName: String,
    shareLocation: Boolean,
    notification: Object
  }
}