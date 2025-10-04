import { Card } from '@components/ui/Card/Card';
import { Section } from '@components/ui/Section/Section';
import { ListGroup } from '@components/ui/ListGroup/ListGroup';
import { Badge } from '@components/ui/Badge/Badge';

export function LayoutShowcase() {
  return (
    <div>
      {/* Card Component Section */}
      <Section
        title="Card Component"
        subtitle="Flexible card component with optional header and footer"
        variant="default"
        spacing="lg"
        containerWidth="xl"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Card */}
          <Card>
            <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
            <p className="text-gray-600">
              A simple card with just body content. No header or footer included.
            </p>
          </Card>

          {/* Card with Header */}
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Card with Header</h3>
                <Badge variant="primary">New</Badge>
              </div>
            }
          >
            <p className="text-gray-600">
              This card includes a header section with a title and badge.
            </p>
          </Card>

          {/* Card with Footer */}
          <Card
            footer={
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            }
          >
            <h3 className="text-lg font-semibold mb-2">Card with Footer</h3>
            <p className="text-gray-600">
              This card includes a footer with action buttons.
            </p>
          </Card>

          {/* Card with Header and Footer */}
          <Card
            header={<h3 className="text-lg font-semibold">Complete Card</h3>}
            footer={
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            }
          >
            <p className="text-gray-600 mb-3">
              This card demonstrates both header and footer sections working together.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Header with title</li>
              <li>Body with content</li>
              <li>Footer with metadata</li>
            </ul>
          </Card>

          {/* Card with Rich Content */}
          <Card
            header={
              <div>
                <h3 className="text-lg font-semibold">Feature Card</h3>
                <p className="text-sm text-gray-500 mt-1">Premium feature</p>
              </div>
            }
            footer={
              <div className="flex items-center justify-between">
                <Badge variant="success" pill>Available</Badge>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Learn more →
                </button>
              </div>
            }
          >
            <p className="text-gray-600 mb-3">
              Advanced card with rich header content and interactive footer.
            </p>
            <div className="flex gap-2">
              <Badge variant="info">React</Badge>
              <Badge variant="info">TypeScript</Badge>
            </div>
          </Card>

          {/* Card with Image-like Content */}
          <Card
            header={<h3 className="text-lg font-semibold">Media Card</h3>}
            footer={
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>👁️ 1.2k views</span>
                <span>❤️ 42 likes</span>
              </div>
            }
          >
            <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center text-gray-400">
              Image Placeholder
            </div>
            <p className="text-gray-600 text-sm">
              Card showcasing media content with engagement metrics.
            </p>
          </Card>
        </div>
      </Section>

      {/* Section Component */}
      <Section
        title="Section Component"
        subtitle="Flexible section component with variants, spacing, and container widths"
        variant="primary"
        spacing="xl"
        containerWidth="xl"
        centered
      >
        <div className="space-y-8">
          {/* Default Section */}
          <Section
            title="Default Section"
            subtitle="Standard section with default variant and medium spacing"
            variant="default"
            spacing="md"
            containerWidth="lg"
          >
            <p className="text-gray-600">
              This is a default section with medium spacing and large container width.
              Perfect for most content layouts.
            </p>
          </Section>

          {/* Primary Section */}
          <Section
            title="Primary Section"
            subtitle="Primary variant with large spacing"
            variant="primary"
            spacing="lg"
            containerWidth="md"
          >
            <p className="text-gray-600">
              This section uses the primary variant with a medium container width,
              creating a more focused content area.
            </p>
          </Section>

          {/* Secondary Section */}
          <Section
            title="Secondary Section"
            subtitle="Secondary variant with small spacing"
            variant="secondary"
            spacing="sm"
            containerWidth="full"
          >
            <p className="text-gray-600">
              This section spans the full width with minimal spacing,
              ideal for dense information displays.
            </p>
          </Section>

          {/* Dark Section */}
          <Section
            title="Dark Section"
            subtitle="Dark variant with extra large spacing"
            variant="dark"
            spacing="xl"
            containerWidth="sm"
            centered
          >
            <p className="text-gray-300">
              This dark section features centered content with a small container,
              perfect for highlighting important information.
            </p>
          </Section>

          {/* Section with No Spacing */}
          <Section
            title="Compact Section"
            variant="default"
            spacing="none"
            containerWidth="lg"
          >
            <p className="text-gray-600">
              This section has no spacing, allowing for tight content layouts when needed.
            </p>
          </Section>

          {/* Section with Custom Content */}
          <Section
            title="Section with Grid Layout"
            subtitle="Combining section component with custom grid content"
            variant="default"
            spacing="md"
            containerWidth="xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-semibold mb-2">Column 1</h4>
                <p className="text-sm text-gray-600">Content in first column</p>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-semibold mb-2">Column 2</h4>
                <p className="text-sm text-gray-600">Content in second column</p>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-semibold mb-2">Column 3</h4>
                <p className="text-sm text-gray-600">Content in third column</p>
              </div>
            </div>
          </Section>
        </div>
      </Section>

      {/* ListGroup Component */}
      <Section
        title="ListGroup Component"
        subtitle="Versatile list component with active states, badges, and flush variant"
        variant="default"
        spacing="lg"
        containerWidth="xl"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic List</h3>
            <ListGroup
              items={[
                { label: 'First item' },
                { label: 'Second item' },
                { label: 'Third item' },
                { label: 'Fourth item' },
              ]}
            />
          </div>

          {/* List with Active State */}
          <div>
            <h3 className="text-lg font-semibold mb-3">List with Active State</h3>
            <ListGroup
              items={[
                { label: 'Dashboard', active: true },
                { label: 'Settings' },
                { label: 'Profile' },
                { label: 'Messages' },
              ]}
            />
          </div>

          {/* List with Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-3">List with Badges</h3>
            <ListGroup
              items={[
                {
                  label: 'Inbox',
                  badge: <Badge variant="primary">12</Badge>,
                },
                {
                  label: 'Drafts',
                  badge: <Badge variant="secondary">3</Badge>,
                },
                {
                  label: 'Sent',
                  badge: <Badge variant="success">256</Badge>,
                },
                {
                  label: 'Trash',
                  badge: <Badge variant="danger">8</Badge>,
                },
              ]}
            />
          </div>

          {/* Flush Variant */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Flush Variant</h3>
            <ListGroup
              flush
              items={[
                { label: 'No borders' },
                { label: 'No rounded corners' },
                { label: 'Edge-to-edge' },
                { label: 'Minimal styling' },
              ]}
            />
          </div>

          {/* Interactive List with Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Interactive List (Links)</h3>
            <ListGroup
              items={[
                { label: 'Home', href: '#home', active: true },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Contact', href: '#contact' },
              ]}
            />
          </div>

          {/* Interactive List with Click Handlers */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Interactive List (Buttons)</h3>
            <ListGroup
              items={[
                {
                  label: 'Click me',
                  onClick: () => console.log('First clicked'),
                },
                {
                  label: 'Click me too',
                  onClick: () => console.log('Second clicked'),
                  active: true,
                },
                {
                  label: 'And me',
                  onClick: () => console.log('Third clicked'),
                },
                {
                  label: 'Disabled item',
                  onClick: () => console.log('Should not fire'),
                  disabled: true,
                },
              ]}
            />
          </div>

          {/* Combined Features */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">
              Combined Features (Active + Badges + Links)
            </h3>
            <ListGroup
              items={[
                {
                  label: 'Active Tasks',
                  href: '#tasks',
                  active: true,
                  badge: <Badge variant="warning" pill>5</Badge>,
                },
                {
                  label: 'Completed Tasks',
                  href: '#completed',
                  badge: <Badge variant="success" pill>23</Badge>,
                },
                {
                  label: 'Archived Tasks',
                  href: '#archived',
                  badge: <Badge variant="secondary" pill>127</Badge>,
                },
                {
                  label: 'Deleted Tasks',
                  href: '#deleted',
                  disabled: true,
                  badge: <Badge variant="light">0</Badge>,
                },
              ]}
            />
          </div>

          {/* Flush with Active and Badges */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">
              Flush Variant with All Features
            </h3>
            <ListGroup
              flush
              items={[
                {
                  label: 'Notifications',
                  active: true,
                  badge: <Badge variant="danger">3 new</Badge>,
                },
                {
                  label: 'Updates',
                  badge: <Badge variant="info">12 available</Badge>,
                },
                {
                  label: 'Announcements',
                  badge: <Badge variant="primary" pill>1</Badge>,
                },
              ]}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
