import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { projects } from './data';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

test('renders the hero with name and primary actions', () => {
  renderApp();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Youssef\s*Al-Fiqy/);
  expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument();
});

test('renders every section on one page', () => {
  renderApp();
  [/developer hands/i, /where i've shipped/i, /real clients/i, /let's build it/i].forEach((name) => {
    expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
  });
});

test('links every client project to its live site in a new tab', () => {
  renderApp();
  projects.forEach((p) => {
    const link = screen.getByRole('link', { name: new RegExp(p.title.replace('.', '\\.'), 'i') });
    expect(link).toHaveAttribute('href', p.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});

test('legacy /contact route still renders the page', () => {
  renderApp('/contact');
  expect(screen.getByRole('heading', { name: /let's build it/i })).toBeInTheDocument();
});
