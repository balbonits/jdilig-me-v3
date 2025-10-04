import { Badge } from '@components/ui/Badge';
import { Alert } from '@components/ui/Alert';
import { InputGroup } from '@components/ui/InputGroup';
import { MagnifyingGlassIcon, EnvelopeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export function FormsShowcase() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Badge Component Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Badge Component</h2>

        {/* Standard Badges */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Standard Badges</h3>
          <div className="flex flex-wrap gap-3">
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
          <h3 className="text-xl font-semibold mb-4">Pill Badges</h3>
          <div className="flex flex-wrap gap-3">
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
        <h2 className="text-2xl font-bold mb-6">Alert Component</h2>

        {/* Standard Alerts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Standard Alerts</h3>
          <div className="flex flex-col gap-4">
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
          <h3 className="text-xl font-semibold mb-4">Dismissible Alerts</h3>
          <div className="flex flex-col gap-4">
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
        <h2 className="text-2xl font-bold mb-6">InputGroup Component</h2>

        {/* With Prepend */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">With Prepend</h3>
          <div className="flex flex-col gap-4 max-w-md">
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
          <h3 className="text-xl font-semibold mb-4">With Append</h3>
          <div className="flex flex-col gap-4 max-w-md">
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
          <h3 className="text-xl font-semibold mb-4">With Prepend and Append</h3>
          <div className="flex flex-col gap-4 max-w-md">
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
          <h3 className="text-xl font-semibold mb-4">Different Sizes</h3>
          <div className="flex flex-col gap-4 max-w-md">
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
