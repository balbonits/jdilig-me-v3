import { Badge } from '@components/ui/Badge';
import { Alert } from '@components/ui/Alert';
import { InputGroup } from '@components/ui/InputGroup';
import { MagnifyingGlassIcon, EnvelopeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import styles from './showcase.module.css';

export function FormsShowcase() {
  return (
    <div className={styles.showcase}>
      {/* Badge Component Section */}
      <section>
        <h2 className={styles['section-title']}>Badge Component</h2>

        {/* Standard Badges */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>Standard Badges</h3>
          <div className={styles.grid}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="dark">Dark</Badge>
          </div>
        </div>

        {/* Pill Badges */}
        <div>
          <h3 className={styles['subsection-title']}>Pill Badges</h3>
          <div className={styles.grid}>
            <Badge variant="primary" pill>Primary</Badge>
            <Badge variant="secondary" pill>Secondary</Badge>
            <Badge variant="success" pill>Success</Badge>
            <Badge variant="danger" pill>Danger</Badge>
            <Badge variant="warning" pill>Warning</Badge>
            <Badge variant="info" pill>Info</Badge>
            <Badge variant="light" pill>Light</Badge>
            <Badge variant="dark" pill>Dark</Badge>
          </div>
        </div>
      </section>

      {/* Alert Component Section */}
      <section>
        <h2 className={styles['section-title']}>Alert Component</h2>

        {/* Standard Alerts */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>Standard Alerts</h3>
          <div className={styles.col}>
            <Alert variant="primary">
              <strong>Primary Alert:</strong> This is a primary alert message.
            </Alert>
            <Alert variant="secondary">
              <strong>Secondary Alert:</strong> This is a secondary alert message.
            </Alert>
            <Alert variant="success">
              <strong>Success:</strong> Your operation completed successfully!
            </Alert>
            <Alert variant="danger">
              <strong>Error:</strong> Something went wrong. Please try again.
            </Alert>
            <Alert variant="warning">
              <strong>Warning:</strong> Please review your information before proceeding.
            </Alert>
            <Alert variant="info">
              <strong>Info:</strong> Here's some helpful information for you.
            </Alert>
            <Alert variant="light">
              <strong>Light Alert:</strong> This is a light-colored alert message.
            </Alert>
            <Alert variant="dark">
              <strong>Dark Alert:</strong> This is a dark-colored alert message.
            </Alert>
          </div>
        </div>

        {/* Dismissible Alerts */}
        <div>
          <h3 className={styles['subsection-title']}>Dismissible Alerts</h3>
          <div className={styles.col}>
            <Alert variant="success" dismissible>
              <strong>Dismissible Success:</strong> Click the X to dismiss this alert.
            </Alert>
            <Alert variant="danger" dismissible onDismiss={() => console.log('Alert dismissed')}>
              <strong>Dismissible Error:</strong> This alert triggers a callback when dismissed.
            </Alert>
            <Alert variant="info" dismissible>
              <strong>Dismissible Info:</strong> You can close this notification.
            </Alert>
          </div>
        </div>
      </section>

      {/* InputGroup Component Section */}
      <section>
        <h2 className={styles['section-title']}>InputGroup Component</h2>

        {/* With Prepend */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>With Prepend</h3>
          <div className={styles.col} style={{ maxWidth: '28rem' }}>
            <InputGroup prepend={<MagnifyingGlassIcon className="w-5 h-5" />}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
            <InputGroup prepend="@">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
            <InputGroup prepend={<EnvelopeIcon className="w-5 h-5" />}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
          </div>
        </div>

        {/* With Append */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>With Append</h3>
          <div className={styles.col} style={{ maxWidth: '28rem' }}>
            <InputGroup append=".00">
              <input
                type="number"
                placeholder="Amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
            <InputGroup append="@example.com">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
          </div>
        </div>

        {/* With Both Prepend and Append */}
        <div className="mb-8">
          <h3 className={styles['subsection-title']}>With Prepend and Append</h3>
          <div className={styles.col} style={{ maxWidth: '28rem' }}>
            <InputGroup prepend={<CurrencyDollarIcon className="w-5 h-5" />} append=".00">
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
            <InputGroup prepend="https://" append=".com">
              <input
                type="text"
                placeholder="example"
                className="w-full px-3 py-2 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
          </div>
        </div>

        {/* Different Sizes */}
        <div>
          <h3 className={styles['subsection-title']}>Different Sizes</h3>
          <div className={styles.col} style={{ maxWidth: '28rem' }}>
            <div>
              <label className="block text-sm font-medium mb-2">Small Size</label>
              <InputGroup prepend="@" size="sm">
                <input
                  type="text"
                  placeholder="Small input"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </InputGroup>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Medium Size (Default)</label>
              <InputGroup prepend="@" size="md">
                <input
                  type="text"
                  placeholder="Medium input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </InputGroup>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Large Size</label>
              <InputGroup prepend="@" size="lg">
                <input
                  type="text"
                  placeholder="Large input"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
