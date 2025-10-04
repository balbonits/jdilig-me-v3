import { Button, ButtonGroup } from '@components/ui';
import styles from './showcase.module.css';

export function ButtonsShowcase() {
  return (
    <div className={styles.showcase}>
      {/* Header */}
      <div>
        <h1 className={styles['header-title']}>Buttons</h1>
        <p className={styles['header-description']}>
          Bootstrap-inspired button components with multiple variants, sizes, and states.
        </p>
      </div>

      {/* All 8 Variants */}
      <section>
        <h2 className={styles['section-title']}>Button Variants</h2>
        <p className={styles['section-description']}>
          Eight semantic color variants to communicate different actions and meanings.
        </p>
        <div className={styles.grid}>
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
        <h2 className={styles['section-title']}>Outline Variants</h2>
        <p className={styles['section-description']}>
          Use outline buttons for secondary actions or when you need a lighter visual weight.
        </p>
        <div className={styles.grid}>
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
        <h2 className={styles['section-title']}>Button Sizes</h2>
        <p className={styles['section-description']}>
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
        <h2 className={styles['section-title']}>Size Comparison</h2>
        <p className={styles['section-description']}>
          All sizes work consistently across all button variants.
        </p>
        <div className={styles.col}>
          <div className={styles.row}>
            <span className={styles.label}>Small:</span>
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="success" size="sm">Success</Button>
            <Button variant="danger" size="sm">Danger</Button>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Medium:</span>
            <Button variant="primary" size="md">Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="success" size="md">Success</Button>
            <Button variant="danger" size="md">Danger</Button>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Large:</span>
            <Button variant="primary" size="lg">Primary</Button>
            <Button variant="secondary" size="lg">Secondary</Button>
            <Button variant="success" size="lg">Success</Button>
            <Button variant="danger" size="lg">Danger</Button>
          </div>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className={styles['section-title']}>Disabled States</h2>
        <p className={styles['section-description']}>
          Disabled buttons have reduced opacity and cannot be interacted with.
        </p>
        <div className={styles.col}>
          <div>
            <h3 className={styles['subsection-title']}>Solid Disabled</h3>
            <div className={styles.grid}>
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
            <h3 className={styles['subsection-title']}>Outline Disabled</h3>
            <div className={styles.grid}>
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
        <h2 className={styles['section-title']}>Button Groups (Horizontal)</h2>
        <p className={styles['section-description']}>
          Group related buttons together for toolbar-like interfaces. Buttons in a group have connected borders.
        </p>
        <div className={styles.col}>
          <div>
            <h3 className={styles['subsection-title']}>Primary Group</h3>
            <ButtonGroup>
              <Button variant="primary">Left</Button>
              <Button variant="primary">Middle</Button>
              <Button variant="primary">Right</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Secondary Outline Group</h3>
            <ButtonGroup>
              <Button variant="secondary" outline>One</Button>
              <Button variant="secondary" outline>Two</Button>
              <Button variant="secondary" outline>Three</Button>
              <Button variant="secondary" outline>Four</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Mixed Variants</h3>
            <ButtonGroup>
              <Button variant="success">Save</Button>
              <Button variant="warning">Edit</Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Small Size Group</h3>
            <ButtonGroup>
              <Button variant="info" size="sm">Prev</Button>
              <Button variant="info" size="sm">1</Button>
              <Button variant="info" size="sm">2</Button>
              <Button variant="info" size="sm">3</Button>
              <Button variant="info" size="sm">Next</Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Large Size Group</h3>
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
        <h2 className={styles['section-title']}>Interactive Examples</h2>
        <p className={styles['section-description']}>
          Common button patterns and use cases.
        </p>
        <div className={styles.col}>
          <div>
            <h3 className={styles['subsection-title']}>Form Actions</h3>
            <div className={styles['example-group']}>
              <Button variant="primary">Submit</Button>
              <Button variant="secondary" outline>Cancel</Button>
            </div>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Destructive Actions</h3>
            <div className={styles['example-group']}>
              <Button variant="danger">Delete Account</Button>
              <Button variant="secondary" outline>Keep Account</Button>
            </div>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Status Actions</h3>
            <div className={styles['example-group']}>
              <Button variant="success" size="sm">Approve</Button>
              <Button variant="warning" size="sm">Pending</Button>
              <Button variant="danger" size="sm">Reject</Button>
            </div>
          </div>
          <div>
            <h3 className={styles['subsection-title']}>Navigation Group</h3>
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
