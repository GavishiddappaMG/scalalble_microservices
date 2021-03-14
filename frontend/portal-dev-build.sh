rm -R packages

# Create directory to store generated tar file
mkdir -p packages

# Build Device app
cd ../apps/devices
npm i # Library npm install - Dependency
ng build devices
cd dist/devices
npm pack
mv ./*.tgz ../../../../portal/packages/
cd ../../../../portal
npm i ./packages/*.tgz --save # Need to change thi line for better script
npm i # Portal npm install - Dependency

# Build Order app
cd ../apps/orders
npm i # Library npm install - Dependency
ng build orders
cd dist/orders
npm pack
mv ./*.tgz ../../../../portal/packages/
cd ../../../../portal
npm i ./packages/*.tgz --save # Need to change thi line for better script
npm i # Portal npm install - Dependency

# Finally Serve
ng serve