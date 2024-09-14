'use client';

import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND } from 'baseui/button';

export default function LoginPage() {
  return (
    <ButtonDock
      primaryAction={<Button>Primary Action</Button>}
      secondaryActions={[
        <Button kind={KIND.secondary} key="first">
          Secondary Action 1
        </Button>,
        <Button kind={KIND.secondary} key="second">
          Secondary Action 2
        </Button>
      ]}
      dismissiveAction={<Button kind={KIND.tertiary}>Dismiss</Button>}
    />
  );
}
