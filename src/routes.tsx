import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import CMSLayout from './layouts/CMSLayout';
import DocsLayout from './layouts/DocsLayout';

// Game Pages
import GamePage from './pages/game/GamePage';
import SettingsPage from './pages/game/SettingsPage';

// CMS Pages
import CMSDashboard from './pages/cms/CMSDashboard';
import SoundsManagement from './pages/cms/SoundsManagement';
import CategoriesManagement from './pages/cms/CategoriesManagement';
import LanguagesManagement from './pages/cms/LanguagesManagement';

// Docs Pages
import DocsHome from './pages/docs/DocsHome';
import TechnicalSpecification from './pages/docs/TechnicalSpecification';
import CodingRules from './pages/docs/CodingRules';
import RequirementsAnalysis from './pages/docs/RequirementsAnalysis';
import DatabaseSchema from './pages/docs/DatabaseSchema';
import DeploymentWorkflow from './pages/docs/DeploymentWorkflow';

// Create router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <GamePage />,
    index: true
  },
  // Keep settings route for direct access if needed, but the main flow will use modals
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/cms',
    element: <CMSLayout />,
    children: [
      { index: true, element: <CMSDashboard /> },
      { path: 'sounds', element: <SoundsManagement /> },
      { path: 'categories', element: <CategoriesManagement /> },
      { path: 'languages', element: <LanguagesManagement /> },
    ],
  },
  {
    path: '/docs',
    element: <DocsLayout />,
    children: [
      { index: true, element: <DocsHome /> },
      { path: 'technical-specification', element: <TechnicalSpecification /> },
      { path: 'coding-rules', element: <CodingRules /> },
      { path: 'requirements-analysis', element: <RequirementsAnalysis /> },
      { path: 'database-schema', element: <DatabaseSchema /> },
      { path: 'deployment-workflow', element: <DeploymentWorkflow /> },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
