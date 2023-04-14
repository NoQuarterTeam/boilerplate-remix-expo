// "use client"
// import * as React from "react"
// import { Modal, Transition } from "@headlessui/react"

// import { join } from "@boilerplate/shared"

// import { CloseButton } from "./CloseButton"

// export interface ModalProps {
//   isOpen: boolean
//   onOpen?: () => void
//   onClose: () => void
//   title?: string
//   position?: "top" | "center"
//   children?: React.ReactNode
//   size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
// }

// export function Modal({ isOpen, size = "xl", onClose, position = "top", ...props }: ModalProps) {
//   return (
//     <Transition.Root appear show={isOpen} as={React.Fragment}>
//       <Modal open={isOpen} as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={React.Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/50" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div
//             className={join(
//               "flex min-h-full flex-col items-center",
//               position === "top" ? "justify-start" : "justify-center",
//               size !== "full" && "p-0 pt-10 sm:p-4 md:pt-16",
//             )}
//           >
//             <Transition.Child
//               as={React.Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Modal.Panel
//                 className={join(
//                   "relative w-full overflow-hidden rounded-sm bg-white shadow-xl transition-all dark:bg-gray-700",
//                   size === "sm" && "max-w-sm",
//                   size === "md" && "max-w-md",
//                   size === "lg" && "max-w-lg",
//                   size === "xl" && "max-w-xl",
//                   size === "2xl" && "max-w-2xl",
//                   size === "3xl" && "max-w-3xl",
//                   size === "full" && "max-w-full",
//                 )}
//               >
//                 {props.title && (
//                   <Modal.Title as="p" className="p-4 pb-0 text-lg font-medium">
//                     {props.title}
//                   </Modal.Title>
//                 )}
//                 <div className="absolute right-2 top-2">
//                   <CloseButton size="sm" onClick={onClose} />
//                 </div>
//                 <div>{props.children}</div>
//               </Modal.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Modal>
//     </Transition.Root>
//   )
// }

"use client"
import * as React from "react"
import { BiX } from "react-icons/bi"
// import { twMerge } from 'tailwind-join'
// import { CloseButton } from "./CloseButton"
import * as ModalPrimitive from "@radix-ui/react-dialog"

import { join, merge, type UseDisclosure } from "@boilerplate/shared"

const ModalRoot = ModalPrimitive.Root

const ModalTrigger = ModalPrimitive.Trigger

const ModalPortal = ({ className, children, ...props }: ModalPrimitive.DialogPortalProps) => (
  <ModalPrimitive.Portal className={merge(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">{children}</div>
  </ModalPrimitive.Portal>
)
ModalPortal.displayName = ModalPrimitive.Portal.displayName

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <ModalPrimitive.Overlay
    className={merge(
      "data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100",
      className,
    )}
    {...props}
    ref={ref}
  />
))
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <ModalPrimitive.Content
      ref={ref}
      className={merge(
        "animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-50 grid w-full gap-4 rounded-b-lg bg-white p-6 sm:rounded-lg",
        "dark:bg-gray-900",
        className,
      )}
      {...props}
    >
      {children}
      <ModalPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 dark:data-[state=open]:bg-gray-800">
        <BiX className="sq-4" />
        <span className="sr-only">Close</span>
      </ModalPrimitive.Close>
    </ModalPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = ModalPrimitive.Content.displayName

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={merge("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={merge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Title
    ref={ref}
    className={merge("text-lg font-semibold text-gray-900", "dark:text-gray-50", className)}
    {...props}
  />
))
ModalTitle.displayName = ModalPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Description ref={ref} className={merge("text-sm text-gray-500", "dark:text-gray-400", className)} {...props} />
))
ModalDescription.displayName = ModalPrimitive.Description.displayName

export { ModalRoot, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription }

export interface ModalProps extends Partial<UseDisclosure> {
  title?: string
  description?: string
  children?: React.ReactNode
  trigger?: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
}

export function Modal({ size = "md", description, trigger, children, title, ...disclosureProps }: ModalProps) {
  return (
    <ModalRoot open={disclosureProps.isOpen} onOpenChange={disclosureProps.onSetIsOpen}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent
        className={join(
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-md",
          size === "lg" && "max-w-lg",
          size === "xl" && "max-w-xl",
          size === "2xl" && "max-w-2xl",
          size === "3xl" && "max-w-3xl",
          size === "full" && "max-w-full",
        )}
      >
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalRoot>
  )
}