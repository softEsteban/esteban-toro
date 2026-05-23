-- ============================================================
-- FOUNDER OS — Database Schema
-- Supabase (PostgreSQL)
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CORE TABLES
-- ============================================================

CREATE TABLE fo_domains (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL UNIQUE,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT,
  icon         TEXT,
  color        TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_tags (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE,
  color TEXT
);

CREATE TABLE fo_books (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  author              TEXT NOT NULL,
  cover_url           TEXT,
  cover_color         TEXT,
  summary             TEXT NOT NULL,
  core_idea           TEXT NOT NULL,
  difficulty          TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  published_year      INTEGER,
  read_time_minutes   INTEGER,
  slug                TEXT NOT NULL UNIQUE,
  order_index         INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_book_domains (
  book_id    UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  domain_id  UUID NOT NULL REFERENCES fo_domains(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, domain_id)
);

CREATE TABLE fo_book_tags (
  book_id  UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  tag_id   UUID NOT NULL REFERENCES fo_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, tag_id)
);

CREATE TABLE fo_related_books (
  book_id         UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  related_book_id UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, related_book_id),
  CHECK (book_id != related_book_id)
);

CREATE TABLE fo_key_concepts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id     UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT,
  order_index INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_reflection_questions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id     UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  context     TEXT,
  order_index INTEGER DEFAULT 0
);

-- ============================================================
-- MENTAL MODELS
-- ============================================================

CREATE TABLE fo_mental_models (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title                TEXT NOT NULL,
  slug                 TEXT NOT NULL UNIQUE,
  description          TEXT NOT NULL,
  detailed_explanation TEXT,
  origin_book_id       UUID REFERENCES fo_books(id) ON DELETE SET NULL,
  application_examples TEXT[] DEFAULT '{}',
  icon                 TEXT,
  category             TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_book_mental_models (
  book_id         UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  mental_model_id UUID NOT NULL REFERENCES fo_mental_models(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, mental_model_id)
);

CREATE TABLE fo_mental_model_relations (
  model_id         UUID NOT NULL REFERENCES fo_mental_models(id) ON DELETE CASCADE,
  related_model_id UUID NOT NULL REFERENCES fo_mental_models(id) ON DELETE CASCADE,
  PRIMARY KEY (model_id, related_model_id),
  CHECK (model_id != related_model_id)
);

-- ============================================================
-- EXERCISES
-- ============================================================

CREATE TABLE fo_exercises (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  goal              TEXT NOT NULL,
  instructions      TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 30,
  difficulty        TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  icon              TEXT,
  category          TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_exercise_questions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercise_id   UUID NOT NULL REFERENCES fo_exercises(id) ON DELETE CASCADE,
  question      TEXT NOT NULL,
  context       TEXT,
  placeholder   TEXT,
  question_type TEXT NOT NULL CHECK (question_type IN ('text','textarea','number','choice','scale')) DEFAULT 'textarea',
  options       TEXT[],
  order_index   INTEGER DEFAULT 0
);

CREATE TABLE fo_book_exercises (
  book_id     UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES fo_exercises(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, exercise_id)
);

-- ============================================================
-- FRAMEWORKS
-- ============================================================

CREATE TABLE fo_frameworks (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  description    TEXT NOT NULL,
  origin_book_id UUID REFERENCES fo_books(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_framework_steps (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  framework_id UUID NOT NULL REFERENCES fo_frameworks(id) ON DELETE CASCADE,
  step_number  INTEGER NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  action       TEXT,
  order_index  INTEGER DEFAULT 0
);

-- ============================================================
-- USER DATA (future Supabase Auth integration)
-- ============================================================

CREATE TABLE fo_user_profiles (
  id                    UUID PRIMARY KEY,  -- mirrors auth.users.id
  display_name          TEXT,
  avatar_url            TEXT,
  onboarding_completed  BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_user_book_progress (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES fo_user_profiles(id) ON DELETE CASCADE,
  book_id             UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  status              TEXT NOT NULL CHECK (status IN ('not_started','in_progress','completed')) DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

CREATE TABLE fo_user_exercise_responses (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES fo_user_profiles(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES fo_exercises(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES fo_exercise_questions(id) ON DELETE CASCADE,
  response    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, question_id)
);

CREATE TABLE fo_user_saved_items (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES fo_user_profiles(id) ON DELETE CASCADE,
  item_type  TEXT NOT NULL CHECK (item_type IN ('book','mental_model','exercise','framework','concept')),
  item_id    UUID NOT NULL,
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, item_type, item_id)
);

CREATE TABLE fo_user_notes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES fo_user_profiles(id) ON DELETE CASCADE,
  book_id     UUID NOT NULL REFERENCES fo_books(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fo_user_streaks (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES fo_user_profiles(id) ON DELETE CASCADE UNIQUE,
  current_streak    INTEGER DEFAULT 0,
  longest_streak    INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_days_active INTEGER DEFAULT 0,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_fo_books_slug ON fo_books(slug);
CREATE INDEX idx_fo_books_difficulty ON fo_books(difficulty);
CREATE INDEX idx_fo_mental_models_slug ON fo_mental_models(slug);
CREATE INDEX idx_fo_exercises_slug ON fo_exercises(slug);
CREATE INDEX idx_fo_key_concepts_book_id ON fo_key_concepts(book_id, order_index);
CREATE INDEX idx_fo_reflection_questions_book_id ON fo_reflection_questions(book_id);
CREATE INDEX idx_fo_exercise_questions_exercise_id ON fo_exercise_questions(exercise_id, order_index);
CREATE INDEX idx_fo_user_book_progress_user_id ON fo_user_book_progress(user_id);
CREATE INDEX idx_fo_user_saved_items_user_id ON fo_user_saved_items(user_id);

-- ============================================================
-- SEED: DOMAINS
-- ============================================================

INSERT INTO fo_domains (name, slug, description, icon, color) VALUES
  ('Freedom',          'freedom',          'Design a life of autonomy, independence, and optionality',                           'Bird',       '#8B5CF6'),
  ('Wealth',           'wealth',           'Build financial independence through leverage and scalable systems',                  'TrendingUp', '#F59E0B'),
  ('Meaning',          'meaning',          'Find purpose, pursue what matters, and live intentionally',                          'Heart',      '#EF4444'),
  ('Creation',         'creation',         'Build products, businesses, art, and lasting work',                                  'Zap',        '#3B82F6'),
  ('Focus',            'focus',            'Master attention, eliminate noise, and do deep work',                                'Target',     '#10B981'),
  ('Business',         'business',         'Systems, strategy, execution, and scaling',                                          'Building2',  '#6366F1'),
  ('Decision Making',  'decision-making',  'Think with clarity, reason from first principles, and choose wisely',                'Brain',      '#EC4899'),
  ('Systems Thinking', 'systems-thinking', 'See patterns, leverage feedback loops, and design for emergence',                    'Network',    '#14B8A6');

-- ============================================================
-- SEED: TAGS
-- ============================================================

INSERT INTO fo_tags (name, slug, color) VALUES
  ('wealth-building',   'wealth-building',   '#F59E0B'),
  ('entrepreneurship',  'entrepreneurship',  '#3B82F6'),
  ('productivity',      'productivity',      '#10B981'),
  ('mindset',           'mindset',           '#8B5CF6'),
  ('habits',            'habits',            '#EF4444'),
  ('creativity',        'creativity',        '#EC4899'),
  ('philosophy',        'philosophy',        '#6366F1'),
  ('business-strategy', 'business-strategy', '#F97316'),
  ('marketing',         'marketing',         '#14B8A6'),
  ('focus',             'focus',             '#84CC16'),
  ('investing',         'investing',         '#F59E0B'),
  ('freedom',           'freedom',           '#A78BFA'),
  ('leverage',          'leverage',          '#60A5FA');

-- ============================================================
-- SEED: BOOKS
-- ============================================================

INSERT INTO fo_books (title, author, summary, core_idea, difficulty, published_year, read_time_minutes, slug, cover_color, order_index) VALUES
  (
    'The Millionaire Fastlane', 'MJ DeMarco',
    'A contrarian guide to wealth that dismantles the conventional "get a job, max your 401k, wait 40 years" script. DeMarco maps three roads to wealth — Sidewalk, Slowlane, and Fastlane — arguing that real freedom comes from building scalable systems, not trading time for money.',
    'Stop trading time for money. Build scalable businesses, code, or content that generate value while you sleep. The equation for wealth is not income — it is leverage.',
    'intermediate', 2011, 360, 'millionaire-fastlane', '#D97706', 1
  ),
  (
    'The 4-Hour Workweek', 'Tim Ferriss',
    'Ferriss introduces the DEAL framework — Definition, Elimination, Automation, Liberation — as a blueprint for escaping the traditional deferred-life plan. Through outsourcing, automation, and lifestyle design, he argues you can live like a millionaire without being one.',
    'Life does not have to be about deferring living until retirement. Use technology, outsourcing, and clear priorities to design your ideal life now — not at 65.',
    'beginner', 2007, 300, '4-hour-workweek', '#0D9488', 2
  ),
  (
    '$100M Offers', 'Alex Hormozi',
    'Hormozi breaks down the anatomy of an irresistible offer — one that customers feel foolish rejecting. He systematically deconstructs value, pricing, risk reversal, and framing to show how to create what he calls a Grand Slam Offer.',
    'The product is secondary. The offer is everything. Engineer your value stack so the perceived value massively outweighs the price, and customers have no rational reason to say no.',
    'intermediate', 2021, 240, '100m-offers', '#EA580C', 3
  ),
  (
    'The Almanack of Naval Ravikant', 'Eric Jorgenson',
    'A curated collection of Naval Ravikant''s wisdom on wealth and happiness — assembled from interviews, tweets, and essays. Covers how to build wealth without luck, find inner peace, and develop judgment that compounds over time.',
    'Wealth is created by building things society wants at scale, with leverage — code, capital, media, or labor. Happiness is a skill and a choice, not a destination you arrive at.',
    'beginner', 2020, 180, 'almanack-naval-ravikant', '#7C3AED', 4
  ),
  (
    'Deep Work', 'Cal Newport',
    'Newport argues that the ability to focus without distraction on cognitively demanding work is both increasingly rare and increasingly valuable. He provides a philosophy and rules for cultivating this capacity in a distracted world.',
    'The ability to perform deep work — focused, undistracted cognitive effort — is the superpower of the knowledge economy. Those who develop it will thrive; those who surrender to distraction will fall behind.',
    'beginner', 2016, 270, 'deep-work', '#4338CA', 5
  ),
  (
    'Atomic Habits', 'James Clear',
    'Clear presents a comprehensive framework for building good habits and breaking bad ones through tiny, 1% improvements that compound dramatically over time. He introduces the four laws of behavior change and the concept of identity-based habits.',
    'Tiny changes compound into remarkable results. You do not rise to the level of your goals — you fall to the level of your systems. Focus on who you are becoming, not just what you want to achieve.',
    'beginner', 2018, 240, 'atomic-habits', '#059669', 6
  ),
  (
    'The War of Art', 'Steven Pressfield',
    'Pressfield personifies the invisible force that blocks creative work as "Resistance" — the enemy of every writer, entrepreneur, and creator. He argues that turning professional and showing up every day is the only antidote.',
    'Resistance is the universal force that prevents us from doing our most important work. Turning professional — treating your creative work as sacred, showing up every day regardless of feeling — is the only way to defeat it.',
    'beginner', 2002, 120, 'war-of-art', '#BE185D', 7
  ),
  (
    'Man''s Search for Meaning', 'Viktor Frankl',
    'A psychiatrist''s account of life in Nazi concentration camps and the psychological lessons drawn from surviving the worst conditions imaginable. Frankl presents logotherapy — the idea that the will to meaning is humanity''s primary drive.',
    'Everything can be taken from a person except the last human freedom: to choose one''s attitude toward any circumstance. Finding meaning in suffering transforms it from something to be avoided into something to be embraced.',
    'intermediate', 1946, 150, 'mans-search-for-meaning', '#475569', 8
  ),
  (
    'The Psychology of Money', 'Morgan Housel',
    'Housel explores the strange and counterintuitive ways people think about money through 19 short stories. He argues that financial success is less about intelligence or knowledge and more about behavior, humility, and long time horizons.',
    'Financial success is determined more by behavior than by knowledge. Wealth is what you do not spend. The key to good financial outcomes is playing a game you can sustain for decades.',
    'beginner', 2020, 210, 'psychology-of-money', '#CA8A04', 9
  ),
  (
    'Zero to One', 'Peter Thiel',
    'Thiel''s contrarian philosophy on building the future through monopolistic innovation. He argues that copying existing markets (1 to n) is incrementalist and competitive, while creating something genuinely new (0 to 1) is the only path to extraordinary value.',
    'The best businesses create new markets rather than fighting for existing ones. Going from 0 to 1 — creating something truly new — is more valuable and less competitive than copying what already works.',
    'advanced', 2014, 210, 'zero-to-one', '#0369A1', 10
  );

-- ============================================================
-- SEED: KEY CONCEPTS (per book)
-- ============================================================

-- Millionaire Fastlane
WITH b AS (SELECT id FROM fo_books WHERE slug = 'millionaire-fastlane')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('The Three Roads',       'Sidewalk (spend everything), Slowlane (save 40 years), Fastlane (build scalable systems now). Most people are on the wrong road.', 'Map', 0),
  ('The Law of Effection',  'Wealth is proportional to the number of lives you affect. To get rich, you must affect millions — through a product, service, or content that scales.', 'Users', 1),
  ('The CENTS Framework',   'The five commandments of Fastlane businesses: Control, Entry barriers, Need-focused, Time-independent, Scale-capable. Any business failing these cannot create real wealth.', 'CheckSquare', 2),
  ('Produce Don''t Consume','Most people are consumers. Fastlaners become producers — they build what others consume. Shift your identity from consumer to producer.', 'Factory', 3),
  ('Controllable Leverage', 'On the Fastlane you control your income ceiling. You own the system. A job gives you zero control — your boss controls the ceiling.', 'Sliders', 4)
) AS v(title, description, icon, idx);

-- 4-Hour Workweek
WITH b AS (SELECT id FROM fo_books WHERE slug = '4-hour-workweek')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('The DEAL Framework',   'Definition (clarify goals), Elimination (cut waste), Automation (systemize), Liberation (work from anywhere). Four sequential steps to lifestyle design.', 'Workflow', 0),
  ('The New Rich',         'The New Rich are defined not by net worth but by time and mobility. They have more freedom than people waiting for retirement with a million dollars.', 'Crown', 1),
  ('Fear-Setting',         'Instead of goal-setting, practice fear-setting: write your worst-case scenarios and realize they are survivable and often reversible. Most fears are paper tigers.', 'Shield', 2),
  ('Pareto + Parkinson',   '80% of results come from 20% of effort (Pareto). Work expands to fill time allotted (Parkinson). Apply both: identify vital tasks and give them hard deadlines.', 'BarChart2', 3),
  ('Mini-Retirements',     'Instead of deferring life until 65, distribute mini-retirements throughout your life. Live your dream life in chapters, now.', 'Sun', 4)
) AS v(title, description, icon, idx);

-- $100M Offers
WITH b AS (SELECT id FROM fo_books WHERE slug = '100m-offers')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('The Value Equation',  'Value = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort). Maximize the numerator, minimize the denominator to make your offer irresistible.', 'Calculator', 0),
  ('Grand Slam Offer',    'An offer so compelling that customers feel foolish saying no. It stacks value, eliminates risk, and makes the alternative seem objectively inferior.', 'Trophy', 1),
  ('The Value Stack',     'Bundle multiple deliverables, bonuses, and guarantees to dramatically increase perceived value without proportionally increasing your cost to deliver.', 'Layers', 2),
  ('Risk Reversal',       'Remove the customer''s risk entirely. When the seller absorbs all the risk, the only barrier remaining is desire. Guarantees convert fence-sitters.', 'ShieldCheck', 3),
  ('Niche Down',          'The riches are in the niches. The more specifically you target a problem for a specific person, the higher the perceived value and the lower the competition.', 'Crosshair', 4)
) AS v(title, description, icon, idx);

-- Naval Almanack
WITH b AS (SELECT id FROM fo_books WHERE slug = 'almanack-naval-ravikant')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('Specific Knowledge',      'Knowledge you cannot be taught that feels like play to you and looks like work to others. It is the foundation of unique value and can''t be automated or outsourced.', 'Key', 0),
  ('Four Levers of Leverage', 'Labor, capital, code, and media. Code and content are permissionless — anyone can build them without asking anyone for permission.', 'Lever', 1),
  ('Judgment Over Intelligence', 'In the modern world, good judgment is rarer than raw intelligence. Build it through reading, reflection, and exposure to real consequences.', 'Scale', 2),
  ('Happiness as a Skill',    'Happiness is not a destination — it is built through peace, meaningful work, and removing desires that distort your perception of the present.', 'Smile', 3),
  ('Long-Term Games',         'The secret to wealth and great relationships is playing long-term games with long-term people. Reputation and trust compound more powerfully than money.', 'Clock', 4)
) AS v(title, description, icon, idx);

-- Deep Work
WITH b AS (SELECT id FROM fo_books WHERE slug = 'deep-work')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('Deep vs Shallow Work',  'Deep work: cognitively demanding, distraction-free. Shallow work: low-value, logistical. Most knowledge workers spend most of their day in shallow work.', 'Layers', 0),
  ('Attention Residue',     'Switching tasks leaves a cognitive residue — part of your brain stays on the previous task. Batching and blocking protect your full cognitive capacity.', 'Brain', 1),
  ('The Any-Benefit Trap',  'Most people adopt any tool that provides any benefit, ignoring costs to attention. Instead evaluate tools by whether they support your highest-value activities.', 'Filter', 2),
  ('The Four Philosophies', 'Monastic (total isolation), Bimodal (alternating periods), Rhythmic (daily habits), Journalistic (seizing opportunities). Choose what fits your life.', 'Calendar', 3),
  ('Productive Meditation', 'Use physical activity to solve a single professional problem. Trains concentration and surfaces insights unavailable at a desk.', 'Activity', 4)
) AS v(title, description, icon, idx);

-- Atomic Habits
WITH b AS (SELECT id FROM fo_books WHERE slug = 'atomic-habits')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('Identity-Based Habits',        'The most powerful way to change habits is to change your identity. Each action is a vote for the person you want to become. Focus on who, not what.', 'UserCheck', 0),
  ('The Four Laws',                'Make it obvious (cue), make it attractive (craving), make it easy (response), make it satisfying (reward). Invert each law to break bad habits.', 'List', 1),
  ('Habit Stacking',               'Anchor a new habit to an existing one: "After [current habit], I will [new habit]." Leverages existing neural pathways as scaffolding.', 'Link', 2),
  ('Plateau of Latent Potential',  'Habits do not produce results linearly — they compound. You often see no visible change for months, then a breakthrough. Most quit in the valley of disappointment.', 'TrendingUp', 3),
  ('Goldilocks Rule',              'Peak motivation occurs when working on tasks at the edge of current ability — not too hard, not too easy. Design habits to live in this zone.', 'Target', 4)
) AS v(title, description, icon, idx);

-- War of Art
WITH b AS (SELECT id FROM fo_books WHERE slug = 'war-of-art')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('Resistance',              'The invisible universal force that opposes all creative work and self-improvement. It is internal, not external, and strongest when you are closest to your most important work.', 'Shield', 0),
  ('Turning Pro',             'The amateur plays when inspired. The professional shows up every day regardless of feeling. Turning pro means treating your creative work as a sacred obligation, not a hobby.', 'Briefcase', 1),
  ('The Muse',                'Creative inspiration is real — but it comes to those who show up and do the work first. You don''t wait for the muse; you create the conditions for the muse to find you.', 'Sparkles', 2),
  ('Territorial Orientation', 'Hierarchical people do work to impress others and derive worth from external feedback. Territorial people do work for its intrinsic value. Only the territorial is sustainable.', 'Map', 3)
) AS v(title, description, icon, idx);

-- Man's Search for Meaning
WITH b AS (SELECT id FROM fo_books WHERE slug = 'mans-search-for-meaning')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('The Will to Meaning',   'Frankl''s core argument: the primary human drive is not pleasure or power, but the search for meaning. Without meaning, suffering becomes unbearable and self-destructive.', 'Search', 0),
  ('Freedom to Choose',     'Between stimulus and response there is a space. In that space lies your power to choose your response. This freedom cannot be taken from you by any external force.', 'Toggle', 1),
  ('Logotherapy',           'Therapeutic approach based on finding meaning. Meaning can be found in work, in love, and in unavoidable suffering. Each person must find their own unique meaning.', 'Heart', 2),
  ('Tragic Optimism',       'The ability to remain optimistic in spite of suffering, guilt, and death — finding reasons for hope even in the worst circumstances life can present.', 'Sun', 3)
) AS v(title, description, icon, idx);

-- Psychology of Money
WITH b AS (SELECT id FROM fo_books WHERE slug = 'psychology-of-money')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('Wealth vs Rich',      'Rich is visible income and possessions. Wealth is hidden — unspent assets that give you options and freedom. The goal is wealth (optionality), not rich (display).', 'Wallet', 0),
  ('The Role of Luck',    'Success is more attributable to luck and systemic factors than skill alone. This demands humility in success and compassion in judgment of others.', 'Shuffle', 1),
  ('Room for Error',      'The most important financial skill is not optimizing returns — it is creating margin for error so you survive the unexpected and let compounding work for decades.', 'Shield', 2),
  ('Savings Rate',        'Your savings rate is more controllable than investment returns. A high savings rate is less about income and more about managing your desire for display.', 'PiggyBank', 3),
  ('Long Tails',          'A small number of events account for most outcomes. Patience through failures lets you capture the rare, massive wins that dominate long-run returns.', 'TrendingUp', 4)
) AS v(title, description, icon, idx);

-- Zero to One
WITH b AS (SELECT id FROM fo_books WHERE slug = 'zero-to-one')
INSERT INTO fo_key_concepts (book_id, title, description, icon, order_index) SELECT b.id, v.title, v.description, v.icon, v.idx FROM b, (VALUES
  ('0 to 1 vs 1 to n',          'Creating something genuinely new (0→1) is more valuable and less competitive than copying what already exists (1→n). True innovation goes vertical, not horizontal.', 'Plus', 0),
  ('Monopoly is the Goal',       'Competition destroys profits. The best companies build monopolies — not illegally, but by being so uniquely excellent that competition becomes irrelevant.', 'Crown', 1),
  ('Last Mover Advantage',       'It is better to be the last great company in a market than the first. Durability — generating cash flows far into the future — is what determines value.', 'Flag', 2),
  ('Secrets',                    'Every great business is built on a secret — something true that few people believe. What important truth do very few people agree with you on?', 'Lock', 3),
  ('Power Law',                  'In venture and in life, a small number of choices matter exponentially more than all others combined. One market, one skill, one relationship dominates.', 'BarChart', 4)
) AS v(title, description, icon, idx);

-- ============================================================
-- SEED: MENTAL MODELS
-- ============================================================

INSERT INTO fo_mental_models (title, slug, description, application_examples, icon, category) VALUES
  ('Leverage', 'leverage',
   'Use a small input to produce a disproportionately large output. Leverage comes in four forms: labor (people work for you), capital (money works for you), code (software works while you sleep), and media (content works forever). The goal is to decouple your time from your income.',
   ARRAY['Building a software product that serves 10,000 users with the same effort as serving 1','Writing an essay that reaches 1M readers without additional effort per reader','Investing capital so money generates returns without active involvement','Hiring a team to execute your vision, multiplying your effective output'],
   'Lever', 'wealth'),

  ('Compounding', 'compounding',
   'Small improvements repeated consistently produce exponentially larger results over time. This applies to money, skills, relationships, and reputation. The key is time and consistency, not dramatic single actions. Most people overestimate what they can do in a year and underestimate what they can do in a decade.',
   ARRAY['1% daily improvement produces 37x gains over a year (1.01^365 ≈ 37.8)','Warren Buffett acquired 99% of his wealth after age 50 due to compounding','Writing daily builds a body of work that compounds into authority and audience','A trusted reputation compounds through referrals and opportunities that never get advertised'],
   'TrendingUp', 'systems'),

  ('First Principles Thinking', 'first-principles',
   'Break down complex problems into their fundamental truths and rebuild from scratch, rather than reasoning by analogy. Ask "what is fundamentally true here?" instead of "what has been done before?" This is how you find solutions that others miss because they are constrained by precedent.',
   ARRAY['Elon Musk redesigning rocket cost by questioning raw material prices vs assembled cost','Questioning whether you need a physical office, rather than optimizing an existing one','Redesigning pricing from scratch based on value delivered, not what competitors charge','Building a business model around what customers fundamentally want, ignoring conventions'],
   'Cpu', 'thinking'),

  ('Inversion', 'inversion',
   'Instead of asking how to succeed, ask how to avoid failure. Think forward and backward. Identify what would definitively cause the outcome you fear, then avoid those things. Charlie Munger''s principle: "Invert, always invert." Many hard problems become simple when approached backward.',
   ARRAY['"How do I build a great company?" → "What destroys companies?" — avoid those things','Fear-setting: map worst-case scenarios to see they are survivable and often reversible','Risk management: list what would cause project failure and build processes to prevent each','Habit design: identify what would make the habit fail, then remove those obstacles first'],
   'RefreshCw', 'thinking'),

  ('Pareto Principle', 'pareto-principle',
   '80% of results come from 20% of causes. In business: 20% of customers generate 80% of revenue. In productivity: 20% of tasks produce 80% of value. Identify and concentrate ruthlessly on the vital few. Eliminate or delegate the trivial many.',
   ARRAY['20% of customers generate 80% of revenue — who should you protect and prioritize?','20% of your habits produce 80% of your health outcomes — which ones are they?','20% of features generate 80% of usage — which to build and maintain?','20% of meetings produce 80% of decisions — which to keep, which to cancel?'],
   'PieChart', 'productivity'),

  ('Second-Order Thinking', 'second-order',
   'Most people stop at first-order consequences (this action causes that result). Second-order thinking asks: and then what? Third-order continues further. Most strategic mistakes come from ignoring downstream effects. Ask "and then what?" at least twice for every important decision.',
   ARRAY['Hiring a cheap contractor (saves money) who does poor work (costs more to fix later)','Growing revenue fast without systems (more money) leading to chaos (burnout, quality collapse)','Saying yes to every opportunity (more income) but spreading thin (mediocre at everything)','Low prices attracting bad-fit clients who drain time and lower morale across the team'],
   'GitBranch', 'thinking'),

  ('Skin in the Game', 'skin-in-the-game',
   'People make better decisions when they bear the consequences of their choices. Advice from those without skin in the game is unreliable. Build systems and relationships where decision-makers are exposed to both upside and downside.',
   ARRAY['A financial advisor who invests their own money in what they recommend to clients','A founder who takes a pay cut to fund the company they believe in','Offering results-based guarantees — you only win when the client wins','Being skeptical of consultants and pundits who face no consequences for being wrong'],
   'Shield', 'business'),

  ('Systems vs Goals', 'systems-vs-goals',
   'Goals are about the outcomes you want. Systems are about the processes that lead to those outcomes. A focus on systems produces continuous improvement; a focus solely on goals produces one-time achievement followed by regression. Fall in love with the system, not the outcome.',
   ARRAY['"Lose 20 pounds" is a goal. "Exercise daily and eat real food" is a system','""Write a bestseller" is a goal. "Write 500 words every morning" is a system','"Build a $1M business" is a goal. "Talk to 5 customers and ship one improvement weekly" is a system','Identity: becoming the type of person who acts this way consistently, not reaching a milestone'],
   'Settings', 'habits'),

  ('The Resistance', 'the-resistance',
   'Steven Pressfield''s name for the universal, internal force that opposes all creative work and self-improvement. It takes the form of procrastination, self-doubt, rationalization, and distraction. It is strongest precisely when you are closest to your most important work.',
   ARRAY['The impulse to check email before starting the most important task of the day','Spending days planning and researching instead of actually shipping','Feeling intense creative urge the night before a major life commitment','The voice that says "I''ll start tomorrow" — appearing reliably, every single day'],
   'AlertTriangle', 'creativity'),

  ('Optionality', 'optionality',
   'Creating and preserving the ability to choose different paths in the future. The value of an option is the asymmetric upside it provides. In life design: make choices that keep more doors open while closing fewer. Avoid irreversible decisions when uncertainty is high.',
   ARRAY['Building an audience before launching a product — keeps all business model options open','Learning high-leverage skills (writing, coding, selling) that apply across many careers','Maintaining financial margin so you can take career risks others cannot afford to take','Remote work + low cost-of-living location preserves financial and geographic optionality'],
   'GitFork', 'freedom'),

  ('Monopoly Thinking', 'monopoly-thinking',
   'The most valuable businesses occupy unique territory where competition is irrelevant. This is not about illegal monopolies — it is about being so uniquely excellent at something specific that customers have no meaningful alternative. Competition is for those who have not differentiated enough.',
   ARRAY['A creator with a unique voice has a monopoly on their specific perspective and audience','A software product that becomes a platform others build on — switching costs become prohibitive','A specialist who serves a niche so deeply that generalists cannot meaningfully compete','A brand so strong that price comparisons become irrelevant to the buying decision'],
   'Crown', 'business'),

  ('The Flywheel', 'flywheel',
   'A flywheel starts slow and requires significant initial effort. As momentum builds, each push requires less energy for the same output. Great businesses create self-reinforcing loops: growth feeds growth, advantages compound, and the business becomes increasingly difficult to displace.',
   ARRAY['Amazon: lower prices → more customers → more volume → lower costs → lower prices','Content creator: content attracts audience → audience gives feedback → better content','Network effects: each new user makes the product more valuable for existing users','Reputation flywheel: great work → referrals → better clients → more great work'],
   'RefreshCw', 'business');

-- ============================================================
-- SEED: EXERCISES
-- ============================================================

INSERT INTO fo_exercises (title, slug, goal, instructions, estimated_minutes, difficulty, icon, category) VALUES
  ('Values Discovery', 'values-discovery',
   'Identify your 5 core values — the principles that, when honored, make you feel most alive and aligned. These become the filter through which every major decision passes.',
   'This exercise takes you through structured elimination to surface your true core values — not the ones you think you should have, but the ones that are authentically yours. Start broad, narrow ruthlessly, then write what honoring each value looks like in practice.',
   45, 'medium', 'Heart', 'self-knowledge'),

  ('Freedom Number Calculator', 'freedom-number',
   'Calculate the exact monthly income you need to cover your ideal lifestyle. This is your Freedom Number — the minimum you need to be truly free from financial obligation.',
   'Most people pursue "more money" without knowing how much is actually enough. This exercise forces radical clarity on your actual needs vs. perceived needs, giving you a concrete financial target to design your work around.',
   30, 'easy', 'Calculator', 'wealth'),

  ('Ideal Week Design', 'ideal-week',
   'Design your perfect week from scratch — not the week you have, but the week that would make you feel most alive, productive, and fulfilled.',
   'Start from a blank calendar. Ignore current constraints. Design the week you would live if you had full control of your time. Then identify the gap between this ideal and your current reality, and build a plan to close it systematically.',
   60, 'medium', 'Calendar', 'freedom'),

  ('Life Audit', 'life-audit',
   'Rate your satisfaction across 8 core life dimensions to see where you are thriving and where you are neglecting yourself. Identify your highest-leverage area for improvement.',
   'The Life Audit is a regular practice — not a one-time event. Most people drift through life optimizing for the wrong things because they never step back to see the full picture. This exercise gives you that 30,000-foot view.',
   30, 'easy', 'BarChart2', 'self-knowledge'),

  ('Offer Builder', 'offer-builder',
   'Apply Hormozi''s value equation to construct a Grand Slam Offer for your business, service, or product — engineering an offer that eliminates every rational reason to say no.',
   'Work through each element of the value equation systematically: dream outcome, perceived likelihood, time to result, effort required. Then build your value stack, design risk reversals, and write the final offer statement.',
   90, 'hard', 'Trophy', 'business'),

  ('Future Self Letter', 'future-self-letter',
   'Write a letter from your 5-years-in-the-future self to your present self — describing the life you built, the choices you made, and the advice you wish you had followed sooner.',
   'This exercise activates a powerful psychological mechanism: it makes your future self feel real and concrete, reducing temporal discounting. Written from the perspective of your future self looking back, it bypasses current limiting beliefs and activates long-term thinking.',
   45, 'medium', 'Mail', 'meaning'),

  ('Deep Work Audit', 'deep-work-audit',
   'Analyze your current work patterns to understand how much genuine deep work you perform per week and what structural forces are preventing you from doing more.',
   'Track your last 5 working days hour by hour. Classify each hour as deep work, shallow work, or distraction. Calculate your deep work ratio. Identify your three biggest sources of distraction. Design a new schedule that protects your peak cognitive hours.',
   30, 'easy', 'Target', 'focus');

-- Exercise Questions: Values Discovery
WITH ex AS (SELECT id FROM fo_exercises WHERE slug = 'values-discovery')
INSERT INTO fo_exercise_questions (exercise_id, question, context, placeholder, question_type, order_index)
SELECT ex.id, v.q, v.ctx, v.ph, v.qt, v.idx FROM ex, (VALUES
  ('From this list, write every value that resonates with you: Adventure, Authenticity, Balance, Creativity, Excellence, Family, Freedom, Growth, Health, Impact, Independence, Integrity, Joy, Learning, Mastery, Meaning, Service, Simplicity, Wealth, Wisdom.',
   'Do not filter — include everything that resonates even slightly.',
   'All values that feel true to you...', 'textarea', 0),
  ('From your circled values, which 10 feel most essential? Write them here.',
   'Notice which ones you feel emotionally pulled toward, not just intellectually interested in.',
   'Your top 10 values...', 'textarea', 1),
  ('From your top 10, narrow to 5. For each pair, ask: "If I could only keep one, which would I choose?" Write your final 5 core values.',
   'This is uncomfortable — it should be. All your values matter. But some matter more.',
   'My 5 core values are...', 'textarea', 2),
  ('For each of your 5 values, write one sentence: "When I honor this value, I..."',
   null,
   'Value 1: [name] — when I honor this value, I...', 'textarea', 3),
  ('Where in your current life are you most violating these values? What is one concrete change you can make this week?',
   'The gap between stated values and lived values is where most suffering lives.',
   'The biggest gap between my values and my life is...', 'textarea', 4)
) AS v(q, ctx, ph, qt, idx);

-- Exercise Questions: Freedom Number
WITH ex AS (SELECT id FROM fo_exercises WHERE slug = 'freedom-number')
INSERT INTO fo_exercise_questions (exercise_id, question, context, placeholder, question_type, order_index)
SELECT ex.id, v.q, v.ctx, v.ph, v.qt, v.idx FROM ex, (VALUES
  ('List your monthly fixed expenses: rent, utilities, subscriptions, insurance, loan payments. What is the total?',
   'Be honest — include everything that recurs monthly without fail.',
   'Fixed expenses total: $', 'number', 0),
  ('List your monthly variable expenses: food, transport, entertainment, clothing, health. Estimate realistic averages.',
   'Use your last 3 bank statements for accuracy rather than guessing.',
   'Variable expenses total: $', 'number', 1),
  ('What monthly amount would you spend on experiences, travel, and growth (books, courses, events) in your ideal life?',
   'This is your life-enrichment budget. Be honest about what your ideal life actually costs.',
   'Experience budget: $', 'number', 2),
  ('Add 20% to your total for savings and emergency buffer. This is your Freedom Number.',
   'Freedom Number = (Fixed + Variable + Experiences) × 1.2',
   'My Freedom Number is: $', 'number', 3),
  ('What business model, product, or service could realistically generate this amount? Write 3 plausible paths.',
   'You do not need a perfect plan — just plausible starting points worth exploring.',
   '1. ...\n2. ...\n3. ...', 'textarea', 4)
) AS v(q, ctx, ph, qt, idx);

-- Exercise Questions: Deep Work Audit
WITH ex AS (SELECT id FROM fo_exercises WHERE slug = 'deep-work-audit')
INSERT INTO fo_exercise_questions (exercise_id, question, context, placeholder, question_type, order_index)
SELECT ex.id, v.q, v.ctx, v.ph, v.qt, v.idx FROM ex, (VALUES
  ('Estimate how many hours of genuine deep work you did last week. Be brutally honest.',
   'Meetings, email, and "feeling busy" do not count. Only count distraction-free, cognitively demanding work.',
   'Hours of deep work last week:', 'number', 0),
  ('What are your 3 biggest sources of distraction or interruption during work?',
   'Examples: notifications, context-switching, unclear priorities, open office, social media.',
   '1. ...\n2. ...\n3. ...', 'textarea', 1),
  ('When are you at peak cognitive capacity? What does your current schedule look like during those hours?',
   'Most people have 2-4 peak hours. These should be ruthlessly protected for deep work.',
   'My peak hours are... Currently I spend them on...', 'textarea', 2),
  ('Design a new weekly schedule that protects your peak hours. What would you move, cancel, or batch?',
   null,
   'My new protected deep work blocks would be...', 'textarea', 3),
  ('What is one structural change you will implement this week to protect your focus?',
   'Examples: phone in another room, no meetings before noon, email only twice per day.',
   'This week I will implement...', 'text', 4)
) AS v(q, ctx, ph, qt, idx);

-- Exercise Questions: Life Audit
WITH ex AS (SELECT id FROM fo_exercises WHERE slug = 'life-audit')
INSERT INTO fo_exercise_questions (exercise_id, question, context, placeholder, question_type, order_index)
SELECT ex.id, v.q, v.ctx, v.ph, v.qt, v.idx FROM ex, (VALUES
  ('Rate your current satisfaction in each area from 1–10: Health & Fitness, Mental/Emotional Wellbeing, Relationships, Career/Work, Finances, Personal Growth, Fun & Recreation, Environment/Home.',
   '1 = severely neglected, 10 = deeply satisfied.',
   'Health: __ / Mental: __ / Relationships: __ / Career: __ / Finances: __ / Growth: __ / Fun: __ / Environment: __', 'textarea', 0),
  ('Which area scored lowest? What is one honest reason it is where it is?',
   null, 'The lowest area is... because...', 'textarea', 1),
  ('If you raised your lowest-scoring area by 3 points, how would your overall life feel different?',
   null, 'If I improved this area, I would feel...', 'textarea', 2),
  ('What is one concrete action you can take this week to begin raising that score?',
   'Small, specific, and immediate — not a full plan.',
   'This week I will...', 'text', 3)
) AS v(q, ctx, ph, qt, idx);

-- ============================================================
-- SEED: FRAMEWORKS
-- ============================================================

INSERT INTO fo_frameworks (title, slug, description) VALUES
  ('The DEAL Framework',              'deal-framework',   'Tim Ferriss''s four-step system for escaping the 9-to-5: Define what you actually want, Eliminate what is unimportant, Automate what remains, Liberate yourself from location dependency.'),
  ('The CENTS Framework',             'cents-framework',  'MJ DeMarco''s five commandments for evaluating whether a business can create Fastlane wealth: Control, Entry barriers, Need-focused, Time-independent, Scale-capable.'),
  ('The Four Laws of Behavior Change','four-laws',        'James Clear''s Atomic Habits framework: Make it obvious (cue), Make it attractive (craving), Make it easy (response), Make it satisfying (reward). Invert each law to break bad habits.'),
  ('The Value Equation',              'value-equation',   'Alex Hormozi''s formula for creating irresistible offers: Value = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort and Sacrifice).'),
  ('The 80/20 Priority Stack',        '80-20-stack',      'A decision-making framework for identifying and protecting the vital few activities that produce the majority of results, while systematically eliminating or delegating the trivial many.');

WITH fw AS (SELECT id FROM fo_frameworks WHERE slug = 'deal-framework')
INSERT INTO fo_framework_steps (framework_id, step_number, title, description, action)
SELECT fw.id, v.num, v.title, v.desc, v.action FROM fw, (VALUES
  (1, 'Definition',  'Clarify what you want your life to look like. Define your dream lifestyle, your fears, and what you would do if you knew you could not fail.',    'Write a detailed description of your ideal day two years from now.'),
  (2, 'Elimination', 'Apply Pareto and Parkinson. Cut the 80% of tasks that produce 20% of results. Practice a low-information diet. Learn to say no by default.',     'List every recurring task. Eliminate anything that does not directly support your top goals.'),
  (3, 'Automation',  'Build systems and outsource tasks that do not require your personal attention. Automate income through digital products or muse businesses.',      'Identify 3 tasks you can delegate or automate this week.'),
  (4, 'Liberation',  'Negotiate or design location independence. Remove the requirement to be physically present to generate your income.',                             'Map what would need to change in your income sources to work from anywhere.')
) AS v(num, title, desc, action);

WITH fw AS (SELECT id FROM fo_frameworks WHERE slug = 'four-laws')
INSERT INTO fo_framework_steps (framework_id, step_number, title, description, action)
SELECT fw.id, v.num, v.title, v.desc, v.action FROM fw, (VALUES
  (1, 'Make It Obvious',     'Design your environment so the cues for your desired habits are visible and prominent. Use implementation intentions: "I will [habit] at [time] in [place]."', 'Redesign one environment (desk, kitchen, bedroom) to make one habit''s cue obvious.'),
  (2, 'Make It Attractive',  'Bundle the habit you need to do with something you want to do. Use temptation bundling and the culture of your surrounding community.',                      'Pair one new habit with something genuinely enjoyable.'),
  (3, 'Make It Easy',        'Reduce friction to the minimum. Design for the two-minute version. Prepare your environment so that the default action is the desired action.',              'Reduce the steps to start one habit to under 20 seconds.'),
  (4, 'Make It Satisfying',  'Give yourself immediate reward after completing the habit. Track your habit to create a visual chain you are motivated not to break.',                       'Create a simple habit tracker and define your immediate reward.')
) AS v(num, title, desc, action);

-- ============================================================
-- SEED: BOOK ↔ DOMAIN RELATIONSHIPS
-- ============================================================

WITH b AS (SELECT id FROM fo_books WHERE slug = 'millionaire-fastlane')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('wealth','freedom','business');

WITH b AS (SELECT id FROM fo_books WHERE slug = '4-hour-workweek')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('freedom','systems-thinking','focus');

WITH b AS (SELECT id FROM fo_books WHERE slug = '100m-offers')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('business','wealth','creation');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'almanack-naval-ravikant')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('wealth','meaning','freedom','decision-making');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'deep-work')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('focus','creation','systems-thinking');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'atomic-habits')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('systems-thinking','focus','meaning');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'war-of-art')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('creation','meaning','focus');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'mans-search-for-meaning')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('meaning','decision-making');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'psychology-of-money')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('wealth','decision-making','systems-thinking');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'zero-to-one')
INSERT INTO fo_book_domains (book_id, domain_id) SELECT b.id, d.id FROM b, fo_domains d WHERE d.slug IN ('business','creation','decision-making');

-- ============================================================
-- SEED: BOOK ↔ TAG RELATIONSHIPS
-- ============================================================

WITH b AS (SELECT id FROM fo_books WHERE slug = 'millionaire-fastlane')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('wealth-building','entrepreneurship','freedom','leverage');

WITH b AS (SELECT id FROM fo_books WHERE slug = '4-hour-workweek')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('freedom','productivity','entrepreneurship');

WITH b AS (SELECT id FROM fo_books WHERE slug = '100m-offers')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('business-strategy','marketing','entrepreneurship','wealth-building');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'almanack-naval-ravikant')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('wealth-building','philosophy','mindset','leverage');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'deep-work')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('focus','productivity','mindset');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'atomic-habits')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('habits','productivity','mindset');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'war-of-art')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('creativity','mindset','philosophy');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'mans-search-for-meaning')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('philosophy','mindset');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'psychology-of-money')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('wealth-building','investing','mindset');

WITH b AS (SELECT id FROM fo_books WHERE slug = 'zero-to-one')
INSERT INTO fo_book_tags (book_id, tag_id) SELECT b.id, t.id FROM b, fo_tags t WHERE t.slug IN ('entrepreneurship','business-strategy','mindset');

-- ============================================================
-- SEED: BOOK ↔ MENTAL MODEL RELATIONSHIPS
-- ============================================================

INSERT INTO fo_book_mental_models (book_id, mental_model_id)
SELECT b.id, m.id FROM fo_books b, fo_mental_models m
WHERE (b.slug, m.slug) IN (
  ('millionaire-fastlane',    'leverage'),
  ('millionaire-fastlane',    'compounding'),
  ('almanack-naval-ravikant', 'leverage'),
  ('almanack-naval-ravikant', 'compounding'),
  ('almanack-naval-ravikant', 'optionality'),
  ('atomic-habits',           'compounding'),
  ('atomic-habits',           'systems-vs-goals'),
  ('war-of-art',              'the-resistance'),
  ('4-hour-workweek',         'pareto-principle'),
  ('4-hour-workweek',         'optionality'),
  ('zero-to-one',             'monopoly-thinking'),
  ('zero-to-one',             'first-principles'),
  ('psychology-of-money',     'compounding'),
  ('psychology-of-money',     'second-order'),
  ('deep-work',               'pareto-principle'),
  ('mans-search-for-meaning', 'inversion')
);

-- ============================================================
-- SEED: BOOK ↔ EXERCISE RELATIONSHIPS
-- ============================================================

INSERT INTO fo_book_exercises (book_id, exercise_id)
SELECT b.id, e.id FROM fo_books b, fo_exercises e
WHERE (b.slug, e.slug) IN (
  ('almanack-naval-ravikant', 'values-discovery'),
  ('millionaire-fastlane',    'freedom-number'),
  ('4-hour-workweek',         'ideal-week'),
  ('100m-offers',             'offer-builder'),
  ('mans-search-for-meaning', 'future-self-letter'),
  ('deep-work',               'deep-work-audit'),
  ('atomic-habits',           'life-audit')
);

-- ============================================================
-- SEED: REFLECTION QUESTIONS
-- ============================================================

WITH b AS (SELECT id FROM fo_books WHERE slug = 'millionaire-fastlane')
INSERT INTO fo_reflection_questions (book_id, question, context, order_index) SELECT b.id, v.q, v.ctx, v.idx FROM b, (VALUES
  ('Are you building a business that scales without your direct time, or just a more stressful job?', 'The key distinction: does your income require your active hours?', 0),
  ('How many lives does your current work touch? How could you 10x that number?', null, 1),
  ('What would it mean to own the system in your field, rather than be a component in someone else''s?', null, 2),
  ('If your active work stopped tomorrow, would you have any residual income? Why not?', null, 3)
) AS v(q, ctx, idx);

WITH b AS (SELECT id FROM fo_books WHERE slug = 'deep-work')
INSERT INTO fo_reflection_questions (book_id, question, context, order_index) SELECT b.id, v.q, v.ctx, v.idx FROM b, (VALUES
  ('In an average week, what is your deep work to shallow work ratio? What does it reveal?', null, 0),
  ('What would be different about your career and output if you tripled your deep work hours?', null, 1),
  ('What is the single distraction that most reliably derails your focus?', null, 2),
  ('Are you currently working at the ceiling of your ability? If not, what is holding you back?', null, 3)
) AS v(q, ctx, idx);

WITH b AS (SELECT id FROM fo_books WHERE slug = 'atomic-habits')
INSERT INTO fo_reflection_questions (book_id, question, context, order_index) SELECT b.id, v.q, v.ctx, v.idx FROM b, (VALUES
  ('What identity are your current daily habits voting for? Is that the person you want to become?', null, 0),
  ('What one habit, done consistently for 12 months, would produce the most significant change in your life?', null, 1),
  ('Where in your environment are there cues triggering bad habits? How could you redesign it?', null, 2)
) AS v(q, ctx, idx);

WITH b AS (SELECT id FROM fo_books WHERE slug = 'almanack-naval-ravikant')
INSERT INTO fo_reflection_questions (book_id, question, context, order_index) SELECT b.id, v.q, v.ctx, v.idx FROM b, (VALUES
  ('What is your specific knowledge — what feels like play to you but looks like work to others?', null, 0),
  ('Which form of leverage do you currently have access to, and which are you ignoring?', null, 1),
  ('Are you optimizing for wealth, income, or optionality? Are these aligned?', null, 2),
  ('What does happiness look like for you as a practice — not a destination?', null, 3)
) AS v(q, ctx, idx);

WITH b AS (SELECT id FROM fo_books WHERE slug = 'mans-search-for-meaning')
INSERT INTO fo_reflection_questions (book_id, question, context, order_index) SELECT b.id, v.q, v.ctx, v.idx FROM b, (VALUES
  ('What gives your work meaning beyond income? Would you do it if the pay were cut in half?', null, 0),
  ('In what area of your life are you most choosing your response, rather than reacting automatically?', null, 1),
  ('What suffering in your life could you reframe as something meaningful rather than something to avoid?', null, 2)
) AS v(q, ctx, idx);

-- ============================================================
-- SEED: RELATED BOOKS
-- ============================================================

INSERT INTO fo_related_books (book_id, related_book_id)
SELECT b1.id, b2.id FROM fo_books b1, fo_books b2
WHERE (b1.slug, b2.slug) IN (
  ('millionaire-fastlane',    'almanack-naval-ravikant'),
  ('millionaire-fastlane',    '4-hour-workweek'),
  ('millionaire-fastlane',    '100m-offers'),
  ('4-hour-workweek',         'millionaire-fastlane'),
  ('4-hour-workweek',         'deep-work'),
  ('deep-work',               'atomic-habits'),
  ('deep-work',               'war-of-art'),
  ('atomic-habits',           'deep-work'),
  ('atomic-habits',           'mans-search-for-meaning'),
  ('psychology-of-money',     'almanack-naval-ravikant'),
  ('psychology-of-money',     'zero-to-one'),
  ('zero-to-one',             '100m-offers'),
  ('zero-to-one',             'almanack-naval-ravikant'),
  ('mans-search-for-meaning', 'war-of-art'),
  ('mans-search-for-meaning', 'almanack-naval-ravikant'),
  ('war-of-art',              'deep-work'),
  ('war-of-art',              'atomic-habits'),
  ('100m-offers',             'millionaire-fastlane'),
  ('almanack-naval-ravikant', 'psychology-of-money'),
  ('almanack-naval-ravikant', 'mans-search-for-meaning')
);
