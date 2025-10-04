import { Button, ButtonGroup } from '@components/ui';

export function ButtonsShowcase() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Buttons</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Bootstrap-inspired button components with multiple variants, sizes, and states.
        </p>
      </div>

      {/* All 8 Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Eight semantic color variants to communicate different actions and meanings.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
        </div>
      </section>

      {/* Outline Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Outline Variants</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Use outline buttons for secondary actions or when you need a lighter visual weight.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" outline>Primary</Button>
          <Button variant="secondary" outline>Secondary</Button>
          <Button variant="success" outline>Success</Button>
          <Button variant="danger" outline>Danger</Button>
          <Button variant="warning" outline>Warning</Button>
          <Button variant="info" outline>Info</Button>
          <Button variant="light" outline>Light</Button>
          <Button variant="dark" outline>Dark</Button>
        </div>
      </section>

      {/* Button Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Three size options: small, medium (default), and large.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </section>

      {/* Size Comparison Across Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Size Comparison</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          All sizes work consistently across all button variants.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-20 text-sm font-medium">Small:</span>
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="success" size="sm">Success</Button>
            <Button variant="danger" size="sm">Danger</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-20 text-sm font-medium">Medium:</span>
            <Button variant="primary" size="md">Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="success" size="md">Success</Button>
            <Button variant="danger" size="md">Danger</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-20 text-sm font-medium">Large:</span>
            <Button variant="primary" size="lg">Primary</Button>
            <Button variant="secondary" size="lg">Secondary</Button>
            <Button variant="success" size="lg">Success</Button>
            <Button variant="danger" size="lg">Danger</Button>
          </div>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Disabled States</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Disabled buttons have reduced opacity and cannot be interacted with.
        </p>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Solid Disabled</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="success" disabled>Success</Button>
              <Button variant="danger" disabled>Danger</Button>
              <Button variant="warning" disabled>Warning</Button>
              <Button variant="info" disabled>Info</Button>
              <Button variant="light" disabled>Light</Button>
              <Button variant="dark" disabled>Dark</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Outline Disabled</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" outline disabled>Primary</Button>
              <Button variant="secondary" outline disabled>Secondary</Button>
              <Button variant="success" outline disabled>Success</Button>
              <Button variant="danger" outline disabled>Danger</Button>
              <Button variant="warning" outline disabled>Warning</Button>
              <Button variant="info" outline disabled>Info</Button>
              <Button variant="light" outline disabled>Light</Button>
              <Button variant="dark" outline disabled>Dark</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ButtonGroup Horizontal */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Groups (Horizontal)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Group related buttons together for toolbar-like interfaces. Buttons in a group have connected borders.
        </p>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Primary Group</h3>
            <ButtonGroup>
              <Button variant="primary">Left</Button>
              <Button variant="primary">Middle</Button>
              <Button variant="primary">Right</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Secondary Outline Group</h3>
            <ButtonGroup>
              <Button variant="secondary" outline>One</Button>
              <Button variant="secondary" outline>Two</Button>
              <Button variant="secondary" outline>Three</Button>
              <Button variant="secondary" outline>Four</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Mixed Variants</h3>
            <ButtonGroup>
              <Button variant="success">Save</Button>
              <Button variant="warning">Edit</Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Small Size Group</h3>
            <ButtonGroup>
              <Button variant="info" size="sm">Prev</Button>
              <Button variant="info" size="sm">1</Button>
              <Button variant="info" size="sm">2</Button>
              <Button variant="info" size="sm">3</Button>
              <Button variant="info" size="sm">Next</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Large Size Group</h3>
            <ButtonGroup>
              <Button variant="dark" size="lg">Bold</Button>
              <Button variant="dark" size="lg">Italic</Button>
              <Button variant="dark" size="lg">Underline</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Common button patterns and use cases.
        </p>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Form Actions</h3>
            <div className="flex gap-3">
              <Button variant="primary">Submit</Button>
              <Button variant="secondary" outline>Cancel</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Destructive Actions</h3>
            <div className="flex gap-3">
              <Button variant="danger">Delete Account</Button>
              <Button variant="secondary" outline>Keep Account</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Status Actions</h3>
            <div className="flex gap-3">
              <Button variant="success" size="sm">Approve</Button>
              <Button variant="warning" size="sm">Pending</Button>
              <Button variant="danger" size="sm">Reject</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Navigation Group</h3>
            <ButtonGroup>
              <Button variant="light">Previous</Button>
              <Button variant="light">1</Button>
              <Button variant="primary">2</Button>
              <Button variant="light">3</Button>
              <Button variant="light">Next</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
