import { Route, Router, Switch } from '@react-nano/router';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { routeMatcherFactory } from './utils/router.util';
import { NewQuizPage } from './pages/NewQuizPage';
import { EditQuizPage } from './pages/EditQuizPage';
import { QuizPage } from './pages/QuizPage';
import { TooltipProvider } from './components/game/ui/tooltip';
import { GamePage } from './pages/GamePage';
import { Toaster as Sonner } from 'sonner';
import { Toaster } from '@/components/game/ui/toaster';

export const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <Router routeMatcherFactory={routeMatcherFactory}>
      <Switch>
        <Route path="/admin" component={MainPage} />
        <Route path="/admin/login" component={LoginPage} />
        <Route path="/admin/quiz/new" component={NewQuizPage} />
        <Route path="/admin/quiz/:id" component={EditQuizPage} />
        <Route path="/admin/quiz" component={QuizPage} />
        <Route path="/" component={GamePage} />
      </Switch>
    </Router>
  </TooltipProvider>
);
