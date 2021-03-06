<nav class="navbar navbar-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <span class="text-font-comic text-white">BounceBoss</span>
    </a>
  </div>

  <div class="navbar-end">
    <a class="navbar-item text-white" href="/home" type="button" style="text-decoration: none;">
      <button class="btn btn-primary-dark">
        <i class="fas fa-home"></i>
        &nbsp;
        Home
    </a>
    </button>

    <a class="navbar-item text-white" href="/game" style="text-decoration: none;">
      <button class="btn btn-primary-dark">
        <i class="fas fa-gamepad"></i>
        &nbsp;
        Play
    </a>
    </button>

    <a class="navbar-item text-white" href="/forum" style="text-decoration: none;">
      <button class="btn btn-primary-dark">
        <i class="fas fa-comments"></i>
        &nbsp;
        Forum   
    </a>
    </button>

    <a class="navbar-item text-white" href="/leaderboards" style="text-decoration: none;">
      <button class="btn btn-primary-dark">
        <i class="fas fa-chart-line"></i>
        &nbsp;
        Leaderboards  
    </a>
    </button>

    @if(Auth::check())
    <a class="navbar-item text-white" href="/profile" style="text-decoration: none;">
      <button class="btn btn-primary-dark">
        <i class="fas fa-user-alt"></i>
        &nbsp;
        My Profile
    </a>
    </button>
    @endif

  </div>

</nav>