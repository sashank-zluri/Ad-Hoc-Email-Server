# Migration Guide: Angular 8 → Angular 19 & Dependencies Update

This document outlines the major changes made to upgrade AHEM from Angular 8 to Angular 19 and update all dependencies to their latest versions as of February 2026.

## Summary of Changes

### Angular Core (8.x → 19.x)
- **Angular** upgraded from 8.2.14 to 19.1.0 (11 major versions!)
- **Angular Material** upgraded from 8.2.3 to 19.1.0
- **TypeScript** upgraded from 3.5.3 to 5.7.2
- **RxJS** upgraded from 6.5.4 to 7.8.1

### Backend Dependencies
- **Express** upgraded from 4.17.1 to 4.21.2
- **MongoDB** driver upgraded from 3.4.1 to 6.12.0 (breaking changes in API)
- **Socket.io** upgraded from 2.3.0 to 4.8.1
- **jsonwebtoken** upgraded from 8.5.1 to 9.0.2
- **mailparser** upgraded from 2.7.7 to 3.7.1
- **Winston** upgraded from 3.2.1 to 3.17.0
- **Axios** upgraded from 0.20.0 to 1.7.9

### Build Tools & Testing
- **webpack** upgraded from 3.x to 5.97.1
- **Jest** upgraded from 25.0.0 to 29.7.0
- **Karma** upgraded from 4.4.1 to 6.4.4
- **Jasmine** upgraded from 3.5.0 to 5.5.0
- **ESLint** replaced TSLint (TSLint is deprecated)

## Breaking Changes & Required Actions

### 1. Angular Material Imports

**Old (Angular 8):**
```typescript
import { MatButtonModule, MatCardModule } from '@angular/material';
```

**New (Angular 19):**
```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
```

All Material imports must now use individual entry points.

### 2. Angular Universal (SSR)

**Major Changes:**
- `@nguniversal/express-engine` and `@nguniversal/module-map-ngfactory-loader` are deprecated
- New `@angular/ssr` package with `CommonEngine` replaces old rendering approach
- `renderModuleFactory` replaced with `CommonEngine.render()`

**Updated:** `universalServer.ts` now uses the new SSR API.

### 3. Polyfills

**Old:** Separate `polyfills.ts` file with explicit imports
```typescript
import 'zone.js/dist/zone';
import 'core-js/es6/reflect';
```

**New:** Polyfills configured in `angular.json`
```json
"polyfills": ["zone.js"]
```

The old `client/polyfills.ts` file is no longer needed (but kept for backward compatibility until full migration).

### 4. TypeScript Configuration

**Updated settings:**
- `target`: `es2015` → `ES2022`
- `module`: `esnext` → `ES2022`
- `moduleResolution`: `node` → `bundler`
- Added strict type checking options
- Removed `typeRoots` (now implicit)

### 5. Angular.json Configuration

**Major changes:**
- Builder changed from `@angular-devkit/build-angular:browser` to `:application`
- `main` renamed to `browser` in build options
- `polyfills` now an array instead of a file path
- Removed `--prod` flag (use `--configuration production`)
- Assets configuration now uses object format with `glob`, `input`, `output`

### 6. Build Scripts

**Updated in package.json:**
```json
"build": "ng build --configuration production"  // instead of "ng build --prod"
"buildDev": "ng build --configuration development"  // instead of "ng build --dev"
```

### 7. Linting: TSLint → ESLint

**New configuration:** `eslint.config.js` replaces `tslint.json`
- Using `@angular-eslint` for Angular-specific rules
- Using `typescript-eslint` for TypeScript rules
- Flat config format (new ESLint 9.x standard)

### 8. RxJS Imports

**Old:**
```typescript
import { Subscription } from 'rxjs/internal/Subscription';
```

**New:**
```typescript
import { Subscription } from 'rxjs';
```

### 9. Removed Dependencies

The following packages were removed as they're no longer maintained or needed:

- `node-sass` → replaced with `sass` (Dart Sass)
- `ng2-adsense` → removed (no longer maintained)
- `ngx-highlight-js` → removed (replaced with modern alternatives)
- `angular-swagger-ui` → removed (use swagger-ui-express on backend)
- `core-js` → no longer needed (modern browsers support ES6+)
- `codelyzer` → removed (TSLint-specific, replaced by Angular ESLint)
- `protractor` → removed (deprecated, use Cypress/Playwright instead)
- `karma-cli` → no longer needed
- `karma-coverage-istanbul-reporter` → replaced with `karma-coverage`

### 10. MongoDB Driver Changes

**MongoDB driver v3 → v6 has breaking changes:**

- Connection API changed
- Callback-based methods removed (use Promises/async-await)
- `collection.update()` → `collection.updateOne()` or `updateMany()`
- `collection.remove()` → `collection.deleteOne()` or `deleteMany()`

**Review and update** `server/app/` files using MongoDB.

## Installation & Build

1. **Clean install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Build for production:**
```bash
npm run build:ssr
```

3. **Run development server:**
```bash
npm run start
```

## Known Issues & Considerations

### 1. MongoDB Code Updates Required
The server-side code using MongoDB needs to be reviewed and updated for the new driver API. Look for:
- Database connection code
- Collection operations (CRUD)
- Cursor iteration

### 2. Socket.io Compatibility
Socket.io v4 has breaking changes. Ensure client and server versions match and review event handling code.

### 3. Strict Type Checking
The new TypeScript configuration enables strict mode. You may see new type errors that need fixing:
- Add proper type annotations
- Handle `null`/`undefined` explicitly
- Fix implicit `any` types

### 4. Testing
All tests need to be reviewed:
- Update test imports for Material modules
- Fix any breaking test utilities
- Update Karma configuration

### 5. Angular Universal
The SSR setup has been updated, but you should:
- Test server-side rendering thoroughly
- Verify that all routes render correctly
- Check for browser-specific code that breaks SSR

## Recommended Next Steps

1. **Run the application** and test all major features
2. **Update MongoDB operations** in `server/app/` to use the new driver API
3. **Run tests** and fix any failures
4. **Check browser console** for any runtime errors
5. **Test SSR** by building and running the universal server
6. **Run linting**: `npm run lint` and fix any issues
7. **Update CI/CD** pipelines if needed (Travis CI config may need updates)
8. **Consider E2E testing** with a modern framework (Cypress/Playwright) to replace Protractor

## Resources

- [Angular Update Guide](https://update.angular.io/)
- [Angular Material Migration](https://material.angular.io/guide/migration)
- [MongoDB Node.js Driver v6 Migration](https://www.mongodb.com/docs/drivers/node/current/upgrade/)
- [Socket.io v4 Migration Guide](https://socket.io/docs/v4/migrating-from-3-x-to-4-0/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

## Support

If you encounter issues during or after migration:
1. Check the Angular CLI update output for specific migration steps
2. Review the breaking changes documentation for each major Angular version
3. Check the GitHub issues for this repository
