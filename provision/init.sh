cd /vagrant
sudo curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum -y install nodejs
yum groupinstall 'Development Tools'
npm run-script cleanAll
echo "Running npm install"
npm install
sudo npm install -g typescript
sudo npm install -g mocha      
npm run-script build