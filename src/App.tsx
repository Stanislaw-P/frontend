import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  Gamepad2,
  GraduationCap,
  Menu,
  MessageSquareText,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import facultyLogo from './assets/logo/logo-square.png'
import './App.css'

type Direction =
  | 'Прикладная математика и информатика'
  | 'Информатика и вычислительная техника'
  | 'Педагогическое образование'

type Graduate = {
  id: number
  name: string
  direction: Direction
  quote: string
}

type Nomination = {
  id: number
  title: string
  winner: string
  description: string
}

const directions: Direction[] = [
  'Прикладная математика и информатика',
  'Информатика и вычислительная техника',
  'Педагогическое образование',
]

const graduates: Graduate[] = [
  {
    id: 1,
    name: 'Алан Кесаев',
    direction: 'Прикладная математика и информатика',
    quote: 'Если задача не решается, значит, пора переписать условие.',
  },
  {
    id: 2,
    name: 'Зарина Тедеева',
    direction: 'Информатика и вычислительная техника',
    quote: 'Главное - не забыть сохранить перед дедлайном.',
  },
  {
    id: 3,
    name: 'Сослан Битаров',
    direction: 'Педагогическое образование',
    quote: 'Объяснить сложное просто - тоже суперспособность.',
  },
  {
    id: 4,
    name: 'Мадина Дзгоева',
    direction: 'Прикладная математика и информатика',
    quote: 'Формулы тоже умеют быть красивыми.',
  },
  {
    id: 5,
    name: 'Тимур Габараев',
    direction: 'Информатика и вычислительная техника',
    quote: 'Работает? Значит, почти готово.',
  },
  {
    id: 6,
    name: 'Диана Хугаева',
    direction: 'Педагогическое образование',
    quote: 'Знания становятся сильнее, когда ими делишься.',
  },
  {
    id: 7,
    name: 'Артур Цаллагов',
    direction: 'Прикладная математика и информатика',
    quote: 'Любой хаос можно привести к системе.',
  },
  {
    id: 8,
    name: 'Элина Мамиева',
    direction: 'Информатика и вычислительная техника',
    quote: 'Лучший код - тот, который завтра не стыдно открыть.',
  },
  {
    id: 9,
    name: 'Камилла Кочиева',
    direction: 'Педагогическое образование',
    quote: 'Терпение, доска и маркер решают многое.',
  },
  {
    id: 10,
    name: 'Руслан Джиоев',
    direction: 'Прикладная математика и информатика',
    quote: 'Матрицы, кофе и уверенность в результате.',
  },
  {
    id: 11,
    name: 'Амина Басаева',
    direction: 'Информатика и вычислительная техника',
    quote: 'Баг - это приглашение подумать еще раз.',
  },
  {
    id: 12,
    name: 'Инал Дзусоев',
    direction: 'Педагогическое образование',
    quote: 'Каждый сложный пример однажды становится простым.',
  },
  {
    id: 13,
    name: 'Лаура Кулумбегова',
    direction: 'Прикладная математика и информатика',
    quote: 'Точность - это тоже форма заботы.',
  },
  {
    id: 14,
    name: 'Давид Плиев',
    direction: 'Информатика и вычислительная техника',
    quote: 'Сначала архитектура, потом паника.',
  },
  {
    id: 15,
    name: 'Милана Созиева',
    direction: 'Педагогическое образование',
    quote: 'Учиться было трудно, но рассказывать об этом будет весело.',
  },
  {
    id: 16,
    name: 'Батраз Хадарцев',
    direction: 'Прикладная математика и информатика',
    quote: 'Вероятность успеха повышается после первой попытки.',
  },
  {
    id: 17,
    name: 'Ева Туаева',
    direction: 'Информатика и вычислительная техника',
    quote: 'Коммит есть, значит, история запомнит.',
  },
  {
    id: 18,
    name: 'Георгий Кусов',
    direction: 'Педагогическое образование',
    quote: 'Главное - не переставать задавать вопросы.',
  },
]

const messages = [
  'Гордимся вами! Пусть диплом станет только началом большого пути.',
  'Спасибо за эти годы, пары, проекты и общую атмосферу факультета.',
  'Желаю каждому найти работу мечты и не забывать родной факультет.',
  'Выпуск 2026, вы сделали это красиво.',
]

const nominations: Nomination[] = [
  {
    id: 1,
    title: 'Главный дедлайн-серфер',
    winner: 'Алан Кесаев',
    description: 'Успевает в последний момент так уверенно, будто это план.',
  },
  {
    id: 2,
    title: 'Повелитель Stack Overflow',
    winner: 'Элина Мамиева',
    description: 'Находит ответ быстрее, чем остальные формулируют вопрос.',
  },
  {
    id: 3,
    title: 'Самый спокойный на защите',
    winner: 'Сослан Битаров',
    description: 'Человек, который принес на защиту внутренний дзен.',
  },
  {
    id: 4,
    title: 'Хранитель конспектов',
    winner: 'Диана Хугаева',
    description: 'Ее записи спасали семестр не один раз.',
  },
  {
    id: 5,
    title: 'Человек-компилятор',
    winner: 'Тимур Габараев',
    description: 'Видит ошибку еще до запуска проекта.',
  },
  {
    id: 6,
    title: 'Мемолог курса',
    winner: 'Милана Созиева',
    description: 'Превращает любую учебную боль в хороший мем.',
  },
]

const scrollItems = [
  { label: 'Главная', id: 'hero' },
  { label: 'Выпускники', id: 'graduates-preview' },
  { label: 'Поздравления', id: 'wall' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="graduates" element={<GraduatesPage />} />
        <Route path="nominations" element={<NominationsPage />} />
        <Route path="game" element={<GamePage />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return window.localStorage.getItem('graduation-theme') === 'dark' ? 'dark' : 'light'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('graduation-theme', theme)
  }, [theme])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      setMenuOpen(false)
      return
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const target = location.hash.replace('#', '')
      window.setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }
  }, [location])

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="На главную">
          <span className="brand-mark">
            <img src={facultyLogo} alt="" />
          </span>
          <span>
            <strong>ФМКН</strong>
            <small>СОГУ</small>
          </span>
        </Link>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Основная навигация">
          {scrollItems.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <Link to="/nominations">Номинации</Link>
          <Link to="/game">Игра</Link>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Переключить тему"
            title="Переключить тему"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Открыть меню"
            title="Меню"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section section-shell" id="hero">
        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="hero-copy">
          <div className="eyebrow">
            <GraduationCap size={18} />
            Выпуск 2026
          </div>
          <h1>Выпуск 2026 факультета математики и компьютерных наук</h1>
          <p>
            Торжественная страница выпускников СОГУ: имена, поздравления,
            номинации и цифровой архив этого дня.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to="/graduates">
              Смотреть выпускников
              <ArrowRight size={18} />
            </Link>
            <a className="secondary-link" href="#wall">
              Оставить пожелание
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Декоративная математическая композиция">
          <div className="faculty-logo">
            <img src={facultyLogo} alt="Логотип факультета" />
          </div>
          <span className="formula formula-one">∫f(x)dx</span>
          <span className="formula formula-two">O(n log n)</span>
          <span className="formula formula-three">f(x)=sin(2x)</span>
          <span className="code-chip">&lt;graduation /&gt;</span>
        </div>
      </section>

      <section className="section-shell" id="graduates-preview">
        <SectionTitle
          icon={<BookOpen size={22} />}
          label="Выпускники"
          title="150 историй, одна точка выпуска"
          text="Пока в проекте 18 временных карточек. Позже сюда добавятся реальные фотографии, цитаты и полный список выпуска."
        />
        <div className="preview-grid">
          {graduates.slice(0, 6).map((graduate) => (
            <GraduateCard key={graduate.id} graduate={graduate} compact />
          ))}
        </div>
        <div className="section-action">
          <Link className="text-link" to="/graduates">
            Открыть полный список
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <WallSection />

      <section className="section-shell" id="nominations-preview">
        <SectionTitle
          icon={<Award size={22} />}
          label="Номинации"
          title="Легкая часть официального вечера"
          text="Здесь будут победители заранее выбранных номинаций. Сейчас карточки временные, чтобы оценить формат."
        />
        <div className="nomination-row">
          {nominations.slice(0, 3).map((nomination) => (
            <NominationCard key={nomination.id} nomination={nomination} />
          ))}
        </div>
        <div className="section-action">
          <Link className="text-link" to="/nominations">
            Все номинации
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="game-banner section-shell" id="game-preview">
        <div>
          <div className="eyebrow">
            <Gamepad2 size={18} />
            Игра
          </div>
          <h2>Отдельная игровая страница уже готова к подключению</h2>
          <p>Пока здесь заглушка. Позже разработчик игры сможет встроить свой компонент на страницу.</p>
        </div>
        <Link className="primary-link" to="/game">
          Перейти к игре
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  )
}

function WallSection() {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) {
      return
    }

    setSubmitted(true)
    setMessage('')
  }

  return (
    <section className="wall-section section-shell" id="wall">
      <SectionTitle
        icon={<MessageSquareText size={22} />}
        label="Стена поздравлений"
        title="Анонимные пожелания выпускникам"
        text="Сообщения будут проходить модерацию, поэтому после отправки они не появляются на стене сразу."
      />

      <div className="wall-layout">
        <form className="message-form" onSubmit={handleSubmit}>
          <label htmlFor="message">Ваше пожелание</label>
          <textarea
            id="message"
            value={message}
            maxLength={150}
            onChange={(event) => {
              setMessage(event.target.value)
              setSubmitted(false)
            }}
            placeholder="Напишите короткое поздравление..."
          />
          <div className="form-footer">
            <span>{message.length}/150</span>
            <button type="submit">Отправить</button>
          </div>
          {submitted && <p className="form-note">Сообщение отправлено на модерацию.</p>}
        </form>

        <div className="message-grid">
          {messages.map((item) => (
            <article className="message-card" key={item}>
              <Sparkles size={18} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GraduatesPage() {
  const [activeDirection, setActiveDirection] = useState<Direction | 'Все'>('Все')

  const visibleGraduates = useMemo(() => {
    if (activeDirection === 'Все') {
      return graduates
    }

    return graduates.filter((graduate) => graduate.direction === activeDirection)
  }, [activeDirection])

  return (
    <section className="page-shell">
      <PageIntro
        icon={<GraduationCap size={24} />}
        label="Выпускники"
        title="Список выпускников"
        text="На первом этапе здесь временные данные. Структура уже рассчитана на полный список примерно из 150 человек."
      />

      <div className="filter-bar" aria-label="Фильтр по направлениям">
        {(['Все', ...directions] as const).map((direction) => (
          <button
            key={direction}
            className={activeDirection === direction ? 'is-active' : ''}
            type="button"
            onClick={() => setActiveDirection(direction)}
          >
            {direction}
          </button>
        ))}
      </div>

      <div className="graduates-grid">
        {visibleGraduates.map((graduate) => (
          <GraduateCard key={graduate.id} graduate={graduate} />
        ))}
      </div>
    </section>
  )
}

function NominationsPage() {
  return (
    <section className="page-shell">
      <PageIntro
        icon={<Award size={24} />}
        label="Номинации"
        title="Победители номинаций"
        text="Список номинаций временный. Позже заменим названия, победителей и фотографии на реальные."
      />

      <div className="nominations-grid">
        {nominations.map((nomination) => (
          <NominationCard key={nomination.id} nomination={nomination} />
        ))}
      </div>
    </section>
  )
}

function GamePage() {
  return (
    <section className="game-page page-shell">
      <PageIntro
        icon={<Gamepad2 size={24} />}
        label="Игра"
        title="Игровая страница"
        text="Здесь будет браузерная игра для выпускного. Сейчас оставлена аккуратная заглушка и место под будущий компонент."
      />

      <div className="game-placeholder">
        <div className="game-orbit">
          <Code2 size={34} />
        </div>
        <h2>Игра появится здесь</h2>
        <p>Компонент можно будет подключить внутрь этой страницы без изменения остальной навигации.</p>
      </div>
    </section>
  )
}

function SectionTitle({
  icon,
  label,
  title,
  text,
}: {
  icon: ReactNode
  label: string
  title: string
  text: string
}) {
  return (
    <div className="section-title">
      <div className="eyebrow">
        {icon}
        {label}
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function PageIntro({
  icon,
  label,
  title,
  text,
}: {
  icon: ReactNode
  label: string
  title: string
  text: string
}) {
  return (
    <div className="page-intro">
      <div className="eyebrow">
        {icon}
        {label}
      </div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

function GraduateCard({ graduate, compact = false }: { graduate: Graduate; compact?: boolean }) {
  return (
    <article className={compact ? 'graduate-card is-compact' : 'graduate-card'}>
      <div className="avatar-placeholder">
        <span>{getInitials(graduate.name)}</span>
      </div>
      <div className="graduate-info">
        <span className="direction">{graduate.direction}</span>
        <h3>{graduate.name}</h3>
        <p>{graduate.quote}</p>
      </div>
    </article>
  )
}

function NominationCard({ nomination }: { nomination: Nomination }) {
  return (
    <article className="nomination-card">
      <div className="nomination-photo">
        <Award size={28} />
      </div>
      <div>
        <span>Номинация</span>
        <h3>{nomination.title}</h3>
        <strong>{nomination.winner}</strong>
        <p>{nomination.description}</p>
      </div>
    </article>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Выпуск 2026</span>
      <p>Северо-Осетинский государственный университет имени Коста Левановича Хетагурова</p>
    </footer>
  )
}

export default App
