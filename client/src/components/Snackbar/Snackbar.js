import React from 'react'

export const NeutralIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)

export const SuccessIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)

function Snackbar({message, isOpen, onClose, type}) {
  const alert = {
    base: 'p-4 pl-12 relative rounded-lg leading-5',
    withClose: 'pr-12',
    success: 'dark:bg-green-50 dark:text-green-900 bg-green-600 text-white',
    danger: 'dark:bg-red-50 dark:text-red-900 bg-red-600 text-white',
    warning: 'dark:bg-yellow-50 dark:text-yellow-900 bg-yellow-600 text-white',
    neutral: 'dark:bg-gray-50 dark:text-gray-800 bg-gray-700 text-gray-300',
    info: 'dark:bg-blue-50 dark:text-blue-900 bg-blue-600 text-white',
    icon: {
      base: 'h-5 w-5',
      success: 'dark:text-green-400 text-green-300',
      danger: 'dark:text-red-400 text-red-300',
      warning: 'dark:text-yellow-400 text-yellow-100',
      neutral: 'dark:text-gray-400 text-gray-500',
      info: 'dark:text-blue-400 text-blue-300',
    },
  }

  if(!type) type = 'neutral'
  const baseStyle = alert.base
  const withCloseStyle = alert.withClose
  const typeStyle = alert[type]
  const iconBaseStyle = alert.icon.base
  const iconTypeStyle = alert.icon[type]

  let cls = baseStyle + " " + typeStyle
  if(onClose) cls += " " + withCloseStyle
  const iconCls = iconBaseStyle + " " + iconTypeStyle + ' absolute left-0 top-0 ml-4 mt-4'
  const closeCls = iconBaseStyle + " " + iconTypeStyle

  let Icon
  switch (type) {
    case 'success':
      Icon = SuccessIcon
      break
    case 'neutral':
      Icon = NeutralIcon
      break
    default:
      Icon = NeutralIcon
  }

  if(!isOpen) {
    return <></>
  }

  return (
    <div className='z-40 fixed inset-x-0 bottom-0 flex sm:justify-end rounded-lg m-8'>
      <div className='w-full overflow-hidden shadow-lg sm:max-w-sm'>
        <div className={cls} role="alert">
          {onClose && (
            <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4" aria-label="close">
              <svg
                className={closeCls}
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
          <Icon className={iconCls} />
          {message}
        </div>
      </div>
    </div>
  )
}

export default Snackbar
