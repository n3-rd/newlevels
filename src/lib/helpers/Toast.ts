import { toast } from '@zerodevx/svelte-toast'

export const success = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': '#4caf50',
    '--toastColor': '#ffffff',
    '--toastBarBackground': '#66bb6a',
    '--toastBorderRadius': '4px',
    '--toastBoxShadow': '0px 3px 5px 2px rgba(0,0,0,0.3)',
    '--toastProgressAnimation': 'linear',
    '--toastProgressBackground': '#ffffff'
  }
})

export const warning = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': '#ff9800',
    '--toastColor': '#ffffff',
    '--toastBarBackground': '#ffa726',
    '--toastBorderRadius': '4px',
    '--toastBoxShadow': '0px 3px 5px 2px rgba(0,0,0,0.3)',
    '--toastProgressAnimation': 'linear',
    '--toastProgressBackground': '#ffffff'
  }
})

export const failure = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': '#f44336',
    '--toastColor': '#ffffff',
    '--toastBarBackground': '#ef5350',
    '--toastBorderRadius': '4px',
    '--toastBoxShadow': '0px 3px 5px 2px rgba(0,0,0,0.3)',
    '--toastProgressAnimation': 'linear',
    '--toastProgressBackground': '#ffffff'
  }
})