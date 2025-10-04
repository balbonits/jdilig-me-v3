import { useState } from 'react';
import { Modal } from '@components/ui/Modal/Modal';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import { Button } from '@components/ui/Button/Button';

export function OverlaysShowcase() {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isMediumModalOpen, setIsMediumModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isXLModalOpen, setIsXLModalOpen] = useState(false);
  const [isModalWithFooterOpen, setIsModalWithFooterOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Overlays Showcase
      </h1>

      {/* Modal Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Modal Component
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          Modals with different sizes (sm, md, lg, xl) and examples with/without footers.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <Button variant="primary" onClick={() => setIsSmallModalOpen(true)}>
            Small Modal
          </Button>
          <Button variant="secondary" onClick={() => setIsMediumModalOpen(true)}>
            Medium Modal
          </Button>
          <Button variant="success" onClick={() => setIsLargeModalOpen(true)}>
            Large Modal
          </Button>
          <Button variant="info" onClick={() => setIsXLModalOpen(true)}>
            Extra Large Modal
          </Button>
          <Button variant="warning" onClick={() => setIsModalWithFooterOpen(true)}>
            Modal with Footer
          </Button>
        </div>

        {/* Small Modal */}
        <Modal
          isOpen={isSmallModalOpen}
          onClose={() => setIsSmallModalOpen(false)}
          title="Small Modal"
          size="sm"
        >
          <p>
            This is a small modal. Perfect for quick confirmations or short messages.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Press ESC or click outside to close.
          </p>
        </Modal>

        {/* Medium Modal */}
        <Modal
          isOpen={isMediumModalOpen}
          onClose={() => setIsMediumModalOpen(false)}
          title="Medium Modal (Default)"
          size="md"
        >
          <p>
            This is a medium-sized modal, which is the default size. It provides a good balance
            between content space and screen usage.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Medium modals are ideal for forms, detailed information, or moderate amounts of content.
          </p>
          <ul style={{ marginTop: '1rem', marginLeft: '1.5rem', listStyle: 'disc' }}>
            <li>Comfortable reading width</li>
            <li>Good for forms with multiple fields</li>
            <li>Works well on most screen sizes</li>
          </ul>
        </Modal>

        {/* Large Modal */}
        <Modal
          isOpen={isLargeModalOpen}
          onClose={() => setIsLargeModalOpen(false)}
          title="Large Modal"
          size="lg"
        >
          <p>
            This is a large modal, suitable for displaying more extensive content, complex forms,
            or detailed information.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              When to use large modals:
            </h3>
            <ul style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
              <li>Multi-step forms or wizards</li>
              <li>Data tables or grids</li>
              <li>Rich text editors</li>
              <li>Detailed product information</li>
              <li>Image galleries or media viewers</li>
            </ul>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
            <p style={{ fontWeight: 'bold' }}>Example content area</p>
            <p style={{ marginTop: '0.5rem' }}>
              Large modals provide plenty of space for complex layouts and detailed information
              without feeling cramped.
            </p>
          </div>
        </Modal>

        {/* Extra Large Modal */}
        <Modal
          isOpen={isXLModalOpen}
          onClose={() => setIsXLModalOpen(false)}
          title="Extra Large Modal"
          size="xl"
        >
          <p>
            This is an extra-large modal, perfect for immersive experiences or displaying
            substantial amounts of content.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Feature 1</h4>
              <p>XL modals can accommodate multiple columns of content.</p>
            </div>
            <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Feature 2</h4>
              <p>Great for dashboard-like layouts within modals.</p>
            </div>
            <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Feature 3</h4>
              <p>Ideal for complex data visualization.</p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Use cases:</h3>
            <ul style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
              <li>Full-featured configuration panels</li>
              <li>Advanced search interfaces</li>
              <li>Detailed analytics dashboards</li>
              <li>Multi-section forms with tabs</li>
              <li>Preview modes for documents or designs</li>
            </ul>
          </div>
        </Modal>

        {/* Modal with Footer */}
        <Modal
          isOpen={isModalWithFooterOpen}
          onClose={() => setIsModalWithFooterOpen(false)}
          title="Modal with Footer Actions"
          size="md"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button
                variant="light"
                onClick={() => setIsModalWithFooterOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert('Confirmed!');
                  setIsModalWithFooterOpen(false);
                }}
              >
                Confirm
              </Button>
            </div>
          }
        >
          <p>
            This modal includes a footer section with action buttons. This pattern is commonly
            used for confirmation dialogs, forms, and interactive workflows.
          </p>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Example Form</p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
              />
            </div>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
            The footer provides a consistent location for primary and secondary actions.
          </p>
        </Modal>
      </section>

      {/* Tooltip Section */}
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Tooltip Component
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          Tooltips in all 4 placements: top, bottom, left, and right. Hover over the buttons to see them.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          {/* Top Tooltip */}
          <div>
            <Tooltip content="This tooltip appears on top" placement="top">
              <Button variant="primary">Hover for Top Tooltip</Button>
            </Tooltip>
          </div>

          {/* Left and Right Tooltips */}
          <div style={{ display: 'flex', gap: '8rem', alignItems: 'center' }}>
            <Tooltip content="This tooltip appears on the left" placement="left">
              <Button variant="secondary">Hover for Left Tooltip</Button>
            </Tooltip>

            <Tooltip content="This tooltip appears on the right" placement="right">
              <Button variant="success">Hover for Right Tooltip</Button>
            </Tooltip>
          </div>

          {/* Bottom Tooltip */}
          <div>
            <Tooltip content="This tooltip appears on the bottom" placement="bottom">
              <Button variant="info">Hover for Bottom Tooltip</Button>
            </Tooltip>
          </div>

          {/* Advanced Tooltip Examples */}
          <div style={{ marginTop: '2rem', width: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Advanced Tooltip Examples
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Tooltip content="Tooltips work great for providing helpful hints" placement="top">
                <Button variant="warning" size="sm">
                  Small Button with Tooltip
                </Button>
              </Tooltip>

              <Tooltip content="You can use tooltips to explain complex features" placement="bottom">
                <Button variant="danger" size="md">
                  Medium Button with Tooltip
                </Button>
              </Tooltip>

              <Tooltip content="Tooltips automatically position themselves" placement="right">
                <Button variant="dark" size="lg">
                  Large Button with Tooltip
                </Button>
              </Tooltip>

              <Tooltip
                content="Tooltips can contain longer text that wraps appropriately"
                placement="left"
              >
                <Button variant="light" outline>
                  Outline Button
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Notes */}
      <section style={{ marginTop: '3rem', padding: '1.5rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Usage Notes
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Modal Features:</h4>
            <ul style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
              <li>Keyboard support: Press ESC to close</li>
              <li>Click outside the modal to dismiss</li>
              <li>Body scroll is prevented when modal is open</li>
              <li>Optional footer for action buttons</li>
              <li>Accessible with ARIA attributes</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Tooltip Features:</h4>
            <ul style={{ marginLeft: '1.5rem', listStyle: 'disc' }}>
              <li>Hover to show, leave to hide</li>
              <li>Four placement options: top, bottom, left, right</li>
              <li>Automatic positioning with visual arrow indicators</li>
              <li>Works with any child element</li>
              <li>Accessible with role="tooltip"</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
