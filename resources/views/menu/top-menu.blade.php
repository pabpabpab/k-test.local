<header class="top_menu">
    <div class="top_menu__left">
        <a href="/" class="menu_link">
            K-Telecom
        </a>
    </div>

    <div class="top_menu__right">
        @guest
            <a href="{{ route('account.login.show') }}" class="menu_link">
                Логин
            </a>
            <a href="{{ route('account.register.show') }}" class="menu_link">
                Регистрация
            </a>
        @else
            <a href="{{ route('admin') }}" class="menu_link">
                {{ $userName = \Illuminate\Support\Facades\Auth::user()->name }}
            </a>
            <a href="{{ route('account.logout') }}" class="menu_link">
                Выйти
            </a>
        @endguest
    </div>
</header>

