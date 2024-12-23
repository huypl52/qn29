# Deployment

## pm2

```bash
npm run build
pm2 serve ./dist/ 3400 
```

## Route 80 to 3400
This works for linux. Setup is required for the first time only.

If you prefer to manage iptables manually or your distribution doesn't have a persistent service:
Create a Startup Script:
Add the iptables commands to a startup script like /etc/rc.local or a systemd service.
Edit /etc/rc.local (if available):
sudo vim /etc/rc.local

3. Add your iptables commands:
```bash

#!/bin/bash
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3400
exit 0
```

4. Make the script executable:
```bash
sudo chmod +x /etc/rc.local
```

5. Using a Custom Systemd Service:
Create a new service file /etc/systemd/system/iptables-restore.service:
—
```bash
[Unit]
Description=Restore iptables rules
After=network.target

[Service]
Type=oneshot
ExecStart=/sbin/iptables-restore < /etc/iptables/rules.v4
ExecStart=/sbin/ip6tables-restore < /etc/iptables/rules.v6
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

6. Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable iptables-restore.service
sudo systemctl start iptables-restore.service
```

7. After rebooting, check if the rules have been applied:

```bash
sudo iptables -t nat -L -v -n
```

## Miscs
To update the API port, update at `public/config.json`