// Homepage Proto - Modern Portfolio Landing Page
import {
  Proto,
  ProtoBox,
  ProtoSection,
  ProtoGrid,
  ProtoFlex,
  ProtoText,
  ProtoButton,
  ProtoCard,
  ProtoImage,
  ProtoAvatar,
  ProtoBadge,
} from '@components/proto';
import {
  CodeBracketIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export function HomepageProto() {
  return (
    <Proto>
      {/* Hero Section */}
      <ProtoBox label="Hero Section - Above the Fold" className="min-h-[500px] md:min-h-[600px]">
        <ProtoSection layout="center" padding="lg" gap="md" className="h-full">
          {/* Main headline */}
          <ProtoText lines={1} variant="heading" width="90%" className="md:w-[60%]" />

          {/* Subheadline/tagline */}
          <ProtoText lines={2} variant="paragraph" width="95%" className="md:w-[70%]" />

          {/* CTA Buttons */}
          <ProtoFlex direction="row" gap="md" justify="center" className="mt-2 md:mt-4 w-full md:w-auto">
            <ProtoButton label="Primary CTA" size="lg" variant="primary" icon={RocketLaunchIcon} />
            <ProtoButton label="Secondary CTA" size="lg" variant="outline" icon={DocumentTextIcon} />
          </ProtoFlex>

          {/* Status badges */}
          <ProtoFlex direction="row" wrap gap="sm" justify="center" className="mt-4">
            <ProtoBadge label="Available" variant="success" />
            <ProtoBadge label="React Expert" variant="primary" />
            <ProtoBadge label="TypeScript" variant="info" />
          </ProtoFlex>
        </ProtoSection>
      </ProtoBox>

      {/* Features/Services Section */}
      <ProtoBox label="Features/Services - What I Do" className="min-h-[400px] md:min-h-[500px]">
        <ProtoSection padding="md" gap="md">
          {/* Section heading */}
          <ProtoSection layout="center" gap="sm">
            <ProtoText lines={1} variant="heading" width="70%" className="md:w-[40%]" />
            <ProtoText lines={1} variant="paragraph" width="90%" className="md:w-[60%]" />
          </ProtoSection>

          {/* Feature cards grid */}
          <ProtoGrid cols="3" gap="md" className="mt-2">
            <ProtoCard
              image={<ProtoImage icon={CodeBracketIcon} label="Development" />}
              title="Full-Stack Development"
              description={<ProtoText lines={3} variant="paragraph" width="100%" />}
            />
            <ProtoCard
              image={<ProtoImage icon={PaintBrushIcon} label="Design" />}
              title="UI/UX Design"
              description={<ProtoText lines={3} variant="paragraph" width="100%" />}
            />
            <ProtoCard
              image={<ProtoImage icon={RocketLaunchIcon} label="Launch" />}
              title="Product Strategy"
              description={<ProtoText lines={3} variant="paragraph" width="100%" />}
            />
          </ProtoGrid>
        </ProtoSection>
      </ProtoBox>

      {/* About Section */}
      <ProtoBox label="About - Personal Introduction" className="min-h-[350px] md:min-h-[450px]">
        <ProtoFlex direction="row" gap="lg" align="center" className="p-4 md:p-8">
          {/* Avatar/Photo */}
          <ProtoFlex shrink={false}>
            <ProtoAvatar size="xl" label="JD" />
          </ProtoFlex>

          {/* About content */}
          <ProtoSection layout="left" gap="md" className="flex-1 text-left">
            <ProtoText lines={1} variant="heading" width="60%" className="md:w-[45%]" />
            <ProtoText lines={4} variant="paragraph" width="100%" className="md:w-[95%]" />
            <ProtoText lines={3} variant="paragraph" width="100%" className="md:w-[90%]" />

            {/* Skills/Tech stack badges */}
            <ProtoFlex direction="row" wrap gap="sm" className="mt-2">
              <ProtoBadge label="React" variant="secondary" />
              <ProtoBadge label="TypeScript" variant="secondary" />
              <ProtoBadge label="Node.js" variant="secondary" />
              <ProtoBadge label="Tailwind" variant="secondary" />
              <ProtoBadge label="Vite" variant="secondary" />
            </ProtoFlex>
          </ProtoSection>
        </ProtoFlex>
      </ProtoBox>

      {/* Recent Work/Projects Section */}
      <ProtoBox label="Recent Work - Portfolio Showcase" className="min-h-[500px] md:min-h-[600px]">
        <ProtoSection padding="md" gap="md">
          {/* Section heading */}
          <ProtoSection layout="center" gap="sm">
            <ProtoText lines={1} variant="heading" width="60%" className="md:w-[35%]" />
            <ProtoText lines={1} variant="paragraph" width="85%" className="md:w-[55%]" />
          </ProtoSection>

          {/* Project cards grid - 2 columns on desktop */}
          <ProtoGrid cols="2" gap="md" className="mt-2">
            <ProtoCard
              image={<ProtoImage label="Project Screenshot 1" />}
              title="E-commerce Platform"
              description={<ProtoText lines={2} variant="paragraph" width="100%" />}
              button={<ProtoButton label="View Project" size="sm" variant="outline" />}
            />
            <ProtoCard
              image={<ProtoImage label="Project Screenshot 2" />}
              title="SaaS Dashboard"
              description={<ProtoText lines={2} variant="paragraph" width="100%" />}
              button={<ProtoButton label="View Project" size="sm" variant="outline" />}
            />
            <ProtoCard
              image={<ProtoImage label="Project Screenshot 3" />}
              title="Mobile App Design"
              description={<ProtoText lines={2} variant="paragraph" width="100%" />}
              button={<ProtoButton label="View Project" size="sm" variant="outline" />}
            />
            <ProtoCard
              image={<ProtoImage label="Project Screenshot 4" />}
              title="Developer Tools"
              description={<ProtoText lines={2} variant="paragraph" width="100%" />}
              button={<ProtoButton label="View Project" size="sm" variant="outline" />}
            />
          </ProtoGrid>

          {/* View all projects link */}
          <ProtoSection layout="center">
            <ProtoButton label="View All Projects" size="md" variant="outline" />
          </ProtoSection>
        </ProtoSection>
      </ProtoBox>

      {/* CTA Footer Section */}
      <ProtoBox label="Call to Action - Contact/Hire" className="min-h-[300px] md:min-h-[350px]">
        <ProtoSection layout="center" padding="lg" gap="md" className="h-full">
          {/* CTA heading */}
          <ProtoText lines={1} variant="heading" width="85%" className="md:w-[55%]" />

          {/* CTA description */}
          <ProtoText lines={2} variant="paragraph" width="95%" className="md:w-[65%]" />

          {/* Contact buttons */}
          <ProtoFlex direction="row" gap="md" justify="center" className="mt-2 w-full md:w-auto">
            <ProtoButton label="Get in Touch" size="lg" variant="primary" icon={EnvelopeIcon} />
            <ProtoButton label="Download Resume" size="lg" variant="outline" icon={DocumentTextIcon} />
          </ProtoFlex>
        </ProtoSection>
      </ProtoBox>
    </Proto>
  );
}
