// Docs Home/Landing Page - TOC/Glossary Layout
import { ProtoNav, ProtoBox, ProtoText } from '@components/proto';

export function DocsHomeProto() {
  return (
    <div className="w-full">
      <ProtoNav
        items={['Home', 'Docs', 'Protos', 'Workflows', 'Style Guide']}
        position="top"
      />

      <ProtoBox label="Documentation Home - Table of Contents" className="min-h-[400px] md:min-h-[700px]">
        <div className="p-4 md:p-8 pt-8 text-left w-full flex flex-col gap-4 md:gap-6">
          {/* Page title and intro */}
          <div className="flex flex-col gap-2 md:gap-3">
            <ProtoText lines={1} variant="heading" width="85%" className="md:w-[60%]" />
            <ProtoText lines={2} variant="paragraph" width="100%" className="md:w-[90%]" />
          </div>

          {/* Getting Started Section */}
          <div className="flex flex-col gap-2 md:gap-3 mt-2">
            <ProtoText lines={1} variant="heading" width="60%" className="md:w-[40%]" />
            <div className="flex flex-col gap-1.5 md:gap-2 pl-2 md:pl-3">
              <div className="flex gap-2 items-start">
                <span className="text-gray-500 text-xs md:text-sm mt-1">•</span>
                <ProtoText lines={1} variant="paragraph" width="80%" className="md:w-[70%]" />
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-500 text-xs md:text-sm mt-1">•</span>
                <ProtoText lines={1} variant="paragraph" width="85%" className="md:w-[75%]" />
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-500 text-xs md:text-sm mt-1">•</span>
                <ProtoText lines={1} variant="paragraph" width="75%" className="md:w-[65%]" />
              </div>
            </div>
          </div>

          {/* Core Concepts Section */}
          <div className="flex flex-col gap-2 md:gap-3 mt-1">
            <ProtoText lines={1} variant="heading" width="55%" className="md:w-[35%]" />
            <div className="flex flex-col gap-2 md:gap-3">
              {/* Item 1 with description */}
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-gray-500 font-mono text-xs md:text-sm w-5 md:w-7 mt-1">1.</span>
                <div className="flex-1 flex flex-col gap-1">
                  <ProtoText lines={1} variant="paragraph" width="85%" className="md:w-[70%]" />
                  <ProtoText lines={2} variant="caption" width="95%" className="md:w-[80%]" />
                </div>
              </div>

              {/* Item 2 with sublist */}
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-gray-500 font-mono text-xs md:text-sm w-5 md:w-7 mt-1">2.</span>
                <div className="flex-1 flex flex-col gap-1">
                  <ProtoText lines={1} variant="paragraph" width="90%" className="md:w-[75%]" />
                  <div className="flex flex-col gap-1 pl-4 md:pl-5 mt-1">
                    <div className="flex gap-2 items-start">
                      <span className="text-gray-400 text-xs mt-0.5">→</span>
                      <ProtoText lines={1} variant="caption" width="80%" className="md:w-[70%]" />
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-gray-400 text-xs mt-0.5">→</span>
                      <ProtoText lines={1} variant="caption" width="75%" className="md:w-[65%]" />
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="text-gray-400 text-xs mt-0.5">→</span>
                      <ProtoText lines={1} variant="caption" width="85%" className="md:w-[73%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-gray-500 font-mono text-xs md:text-sm w-5 md:w-7 mt-1">3.</span>
                <div className="flex-1 flex flex-col gap-1">
                  <ProtoText lines={1} variant="paragraph" width="88%" className="md:w-[76%]" />
                  <ProtoText lines={1} variant="caption" width="92%" className="md:w-[78%]" />
                </div>
              </div>
            </div>
          </div>

          {/* API Reference Section */}
          <div className="flex flex-col gap-2 md:gap-3 mt-1">
            <ProtoText lines={1} variant="heading" width="50%" className="md:w-[32%]" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 text-sm md:text-base mt-1">▸</span>
                <ProtoText lines={1} variant="paragraph" width="85%" />
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 text-sm md:text-base mt-1">▸</span>
                <ProtoText lines={1} variant="paragraph" width="80%" />
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 text-sm md:text-base mt-1">▸</span>
                <ProtoText lines={1} variant="paragraph" width="90%" />
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 text-sm md:text-base mt-1">▸</span>
                <ProtoText lines={1} variant="paragraph" width="75%" />
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="flex flex-col gap-2 md:gap-3 mt-1">
            <ProtoText lines={1} variant="heading" width="65%" className="md:w-[42%]" />
            <div className="flex flex-col gap-1.5 md:gap-2 pl-2 md:pl-3">
              <div className="flex gap-2 items-center">
                <span className="text-blue-500 text-xs md:text-sm">→</span>
                <ProtoText lines={1} variant="paragraph" width="70%" className="md:w-[55%]" />
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-blue-500 text-xs md:text-sm">→</span>
                <ProtoText lines={1} variant="paragraph" width="65%" className="md:w-[50%]" />
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-blue-500 text-xs md:text-sm">→</span>
                <ProtoText lines={1} variant="paragraph" width="75%" className="md:w-[58%]" />
              </div>
            </div>
          </div>
        </div>
      </ProtoBox>
    </div>
  );
}
