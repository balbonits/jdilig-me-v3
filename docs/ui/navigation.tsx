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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '3rem', fontSize: '2rem', fontWeight: 'bold' }}>
        Navigation Components Showcase
      </h1>

      {/* Nav Component Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Nav Component
        </h2>

        {/* Tabs Variant */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
            Tabs Variant
          </h3>
          <Nav variant="tabs" items={tabItems} />
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Active tab: <strong>{activeTab}</strong>
          </div>
        </div>

        {/* Pills Variant */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
            Pills Variant
          </h3>
          <Nav variant="pills" items={pillItems} />
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Active pill: <strong>{activePill}</strong>
          </div>
        </div>

        {/* Vertical Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Navbar Component
        </h2>

        {/* Light Navbar */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Pagination Component
        </h2>

        {/* Basic Pagination */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
            Basic Pagination
          </h3>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Current page: <strong>{currentPage}</strong> of 10
          </div>
        </div>

        {/* Compact Pagination */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
            Compact Pagination (Small Size)
          </h3>
          <Pagination
            currentPage={compactPage}
            totalPages={5}
            onPageChange={setCompactPage}
            size="sm"
            showPrevNext={false}
          />
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Current page: <strong>{compactPage}</strong> of 5
          </div>
        </div>

        {/* Full Pagination */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
            Current page: <strong>{fullPage}</strong> of 20
          </div>
        </div>
      </section>

      {/* Dropdown Component Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Dropdown Component
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Bottom Start */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
            Dropdown With Disabled Items
          </h3>
          <Dropdown
            trigger={<Button variant="primary">Actions</Button>}
            items={dropdownWithDisabled}
          />
        </div>

        {/* Custom Trigger */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1rem' }}>
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
