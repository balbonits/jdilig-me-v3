import { useState } from 'react';
import {
  Nav,
  Navbar,
  Pagination,
  Dropdown,
  Button,
  type NavItem,
  type DropdownItem,
} from '@components/ui';
import styles from './showcase.module.css';

export function NavigationShowcase() {
  // Nav state
  const [activeTab, setActiveTab] = useState('home');
  const [activePill, setActivePill] = useState('profile');
  const [activeVerticalTab, setActiveVerticalTab] = useState('settings');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [compactPage, setCompactPage] = useState(1);
  const [fullPage, setFullPage] = useState(5);

  // Nav items
  const tabItems: NavItem[] = [
    {
      label: 'Home',
      active: activeTab === 'home',
      onClick: () => setActiveTab('home'),
    },
    {
      label: 'Profile',
      active: activeTab === 'profile',
      onClick: () => setActiveTab('profile'),
    },
    {
      label: 'Messages',
      active: activeTab === 'messages',
      onClick: () => setActiveTab('messages'),
    },
    {
      label: 'Settings',
      active: activeTab === 'settings',
      onClick: () => setActiveTab('settings'),
    },
  ];

  const pillItems: NavItem[] = [
    {
      label: 'Profile',
      active: activePill === 'profile',
      onClick: () => setActivePill('profile'),
    },
    {
      label: 'Dashboard',
      active: activePill === 'dashboard',
      onClick: () => setActivePill('dashboard'),
    },
    {
      label: 'Analytics',
      active: activePill === 'analytics',
      onClick: () => setActivePill('analytics'),
    },
  ];

  const verticalTabItems: NavItem[] = [
    {
      label: 'Account',
      active: activeVerticalTab === 'account',
      onClick: () => setActiveVerticalTab('account'),
    },
    {
      label: 'Settings',
      active: activeVerticalTab === 'settings',
      onClick: () => setActiveVerticalTab('settings'),
    },
    {
      label: 'Security',
      active: activeVerticalTab === 'security',
      onClick: () => setActiveVerticalTab('security'),
    },
    {
      label: 'Notifications',
      active: activeVerticalTab === 'notifications',
      onClick: () => setActiveVerticalTab('notifications'),
    },
  ];

  // Dropdown items
  const dropdownItems: DropdownItem[] = [
    { label: 'Action', onClick: () => alert('Action clicked') },
    { label: 'Another action', onClick: () => alert('Another action clicked') },
    { divider: true, label: '' },
    { label: 'Separated link', onClick: () => alert('Separated link clicked') },
  ];

  const dropdownWithDisabled: DropdownItem[] = [
    { label: 'Regular item', onClick: () => alert('Regular item clicked') },
    { label: 'Disabled item', onClick: () => alert('Should not trigger'), disabled: true },
    { divider: true, label: '' },
    { label: 'Another item', onClick: () => alert('Another item clicked') },
  ];

  return (
    <div className={styles.showcase}>
      <h1 className={styles['header-title']}>
        Navigation Components Showcase
      </h1>

      {/* Nav Component Section */}
      <section>
        <h2 className={styles['section-title']}>
          Nav Component
        </h2>

        {/* Tabs Variant */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Tabs Variant
          </h3>
          <Nav variant="tabs" items={tabItems} />
          <div className={styles['text-muted']} style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Active tab: <strong>{activeTab}</strong>
          </div>
        </div>

        {/* Pills Variant */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Pills Variant
          </h3>
          <Nav variant="pills" items={pillItems} />
          <div className={styles['text-muted']} style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Active pill: <strong>{activePill}</strong>
          </div>
        </div>

        {/* Vertical Tabs */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Vertical Tabs
          </h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Nav variant="tabs" items={verticalTabItems} vertical />
            <div style={{ flex: 1, padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
              Active vertical tab: <strong>{activeVerticalTab}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Navbar Component Section */}
      <section>
        <h2 className={styles['section-title']}>
          Navbar Component
        </h2>

        {/* Light Navbar */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Light Navbar
          </h3>
          <Navbar brand={<strong>Brand</strong>}>
            <Nav
              variant="tabs"
              items={[
                { label: 'Home', href: '#' },
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'About', href: '#' },
              ]}
            />
          </Navbar>
        </div>

        {/* Dark Navbar */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Dark Navbar
          </h3>
          <Navbar brand={<strong>Brand</strong>} dark>
            <Nav
              variant="tabs"
              items={[
                { label: 'Home', href: '#' },
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'About', href: '#' },
              ]}
            />
          </Navbar>
        </div>

        {/* Fixed Top Navbar */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Fixed Top Navbar (Demo - Not Actually Fixed)
          </h3>
          <div style={{ position: 'relative' }}>
            <Navbar brand={<strong>Fixed Top</strong>} fixed="top">
              <Nav
                variant="tabs"
                items={[
                  { label: 'Dashboard', href: '#' },
                  { label: 'Reports', href: '#' },
                  { label: 'Settings', href: '#' },
                ]}
              />
            </Navbar>
          </div>
        </div>
      </section>

      {/* Pagination Component Section */}
      <section>
        <h2 className={styles['section-title']}>
          Pagination Component
        </h2>

        {/* Basic Pagination */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Basic Pagination
          </h3>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
          <div className={styles['text-muted']} style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Current page: <strong>{currentPage}</strong> of 10
          </div>
        </div>

        {/* Compact Pagination */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Compact Pagination (Small Size)
          </h3>
          <Pagination
            currentPage={compactPage}
            totalPages={5}
            onPageChange={setCompactPage}
            size="sm"
            showPrevNext={false}
          />
          <div className={styles['text-muted']} style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Current page: <strong>{compactPage}</strong> of 5
          </div>
        </div>

        {/* Full Pagination */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>
            Full Pagination (With First/Last)
          </h3>
          <Pagination
            currentPage={fullPage}
            totalPages={20}
            onPageChange={setFullPage}
            showFirstLast
            size="lg"
            maxVisible={7}
          />
          <div className={styles['text-muted']} style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Current page: <strong>{fullPage}</strong> of 20
          </div>
        </div>
      </section>

      {/* Dropdown Component Section */}
      <section>
        <h2 className={styles['section-title']}>
          Dropdown Component
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Bottom Start */}
          <div>
            <h3 className={styles['subsection-title']}>
              Bottom Start (Default)
            </h3>
            <Dropdown
              trigger={<Button variant="secondary">Dropdown</Button>}
              items={dropdownItems}
              placement="bottom-start"
            />
          </div>

          {/* Bottom End */}
          <div>
            <h3 className={styles['subsection-title']}>
              Bottom End
            </h3>
            <Dropdown
              trigger={<Button variant="secondary">Dropdown</Button>}
              items={dropdownItems}
              placement="bottom-end"
            />
          </div>

          {/* Top Start */}
          <div>
            <h3 className={styles['subsection-title']}>
              Top Start
            </h3>
            <Dropdown
              trigger={<Button variant="secondary">Dropdown</Button>}
              items={dropdownItems}
              placement="top-start"
            />
          </div>

          {/* Top End */}
          <div>
            <h3 className={styles['subsection-title']}>
              Top End
            </h3>
            <Dropdown
              trigger={<Button variant="secondary">Dropdown</Button>}
              items={dropdownItems}
              placement="top-end"
            />
          </div>
        </div>

        {/* With Disabled Items */}
        <div style={{ marginTop: '2rem' }}>
          <h3 className={styles['subsection-title']}>
            Dropdown With Disabled Items
          </h3>
          <Dropdown
            trigger={<Button variant="primary">Actions</Button>}
            items={dropdownWithDisabled}
          />
        </div>

        {/* Custom Trigger */}
        <div style={{ marginTop: '2rem' }}>
          <h3 className={styles['subsection-title']}>
            Custom Trigger Element
          </h3>
          <Dropdown
            trigger={
              <span
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                Click me
              </span>
            }
            items={dropdownItems}
          />
        </div>
      </section>
    </div>
  );
}
