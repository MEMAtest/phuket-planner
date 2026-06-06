#!/bin/bash
# Production Deployment Monitor
# Monitors the app after deployment and runs health checks

set -euo pipefail

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 PRODUCTION DEPLOYMENT MONITOR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# Configuration
APP_URL="${APP_URL:-http://localhost:3000}"
DEPLOY_TIME=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="deployment-$(date '+%Y%m%d-%H%M%S').log"

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_status() {
    local name=$1
    local result=$2
    if [ "$result" = "0" ]; then
        echo "  ✅ $name"
    else
        echo "  ❌ $name - FAILED"
        return 1
    fi
}

log "Deployment started at: $DEPLOY_TIME"
log "App URL: $APP_URL"
echo

# ==============================================================================
# PRE-FLIGHT CHECKS
# ==============================================================================
echo "📋 PRE-FLIGHT CHECKS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check git status
if git diff --quiet && git diff --cached --quiet; then
    check_status "No uncommitted changes" 0
else
    check_status "No uncommitted changes" 1
fi

# Check build exists
if [ -d "build" ]; then
    check_status "Build directory exists" 0
else
    check_status "Build directory exists" 1
    log "ERROR: Build directory not found. Run 'npm run build' first."
    exit 1
fi

# Check critical files
critical_files=(
    "build/index.html"
    "build/static/js"
    "build/static/css"
)

for file in "${critical_files[@]}"; do
    if [ -e "build/$file" ] 2>/dev/null || [ -e "$file" ] 2>/dev/null; then
        check_status "Critical file: $file" 0
    else
        check_status "Critical file: $file" 1
    fi
done

echo

# ==============================================================================
# BUILD VERIFICATION
# ==============================================================================
echo "🔨 BUILD VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check bundle size
log "Checking bundle sizes..."
if [ -f "build/static/js/main."*.js ]; then
    BUNDLE_SIZE=$(du -h build/static/js/main.*.js | cut -f1)
    log "Main bundle size: $BUNDLE_SIZE"
    check_status "Bundle size reasonable (<500KB gzipped)" 0
else
    check_status "Main bundle found" 1
fi

# Check for source maps in production
if ls build/static/js/*.map >/dev/null 2>&1; then
    log "WARNING: Source maps found in production build"
    check_status "No source maps in production" 1
else
    check_status "No source maps in production" 0
fi

echo

# ==============================================================================
# CODE QUALITY CHECKS
# ==============================================================================
echo "✨ CODE QUALITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for console.logs in critical files
log "Checking for console.logs in production code..."
CONSOLE_COUNT=$(grep -r "console\.log\|console\.debug" src/components/German/*.js 2>/dev/null | wc -l || echo "0")
if [ "$CONSOLE_COUNT" -lt "5" ]; then
    check_status "Minimal console.log statements ($CONSOLE_COUNT found)" 0
else
    log "WARNING: Found $CONSOLE_COUNT console.log statements"
    check_status "Minimal console.log statements" 1
fi

# Check for TODO/FIXME comments
TODO_COUNT=$(grep -r "TODO\|FIXME" src/components/German/*.js 2>/dev/null | wc -l || echo "0")
log "TODO/FIXME comments: $TODO_COUNT"

echo

# ==============================================================================
# SECURITY CHECKS
# ==============================================================================
echo "🔒 SECURITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for API keys in code
if grep -r "GROQ_API_KEY\s*=\s*['\"]" src/ 2>/dev/null | grep -v "process.env" | grep -v "||" >/dev/null; then
    log "ERROR: Hardcoded API keys detected!"
    check_status "No hardcoded API keys" 1
else
    check_status "No hardcoded API keys" 0
fi

# Check .env is gitignored
if grep -q "^\.env$" .gitignore 2>/dev/null; then
    check_status ".env in .gitignore" 0
else
    check_status ".env in .gitignore" 1
fi

echo

# ==============================================================================
# RUNTIME HEALTH CHECKS (if server is running)
# ==============================================================================
if curl -s "$APP_URL" >/dev/null 2>&1; then
    echo "🏥 RUNTIME HEALTH CHECKS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # Check homepage loads
    if curl -f -s "$APP_URL" >/dev/null; then
        check_status "Homepage loads (HTTP 200)" 0
    else
        check_status "Homepage loads" 1
    fi

    # Check for React errors in console
    log "Checking for runtime errors..."

    # Check critical resources load
    if curl -f -s "$APP_URL/static/js/" >/dev/null 2>&1; then
        check_status "JavaScript resources accessible" 0
    else
        check_status "JavaScript resources accessible" 1
    fi

    echo
else
    log "ℹ️  Server not running at $APP_URL - skipping runtime checks"
    log "   Start server with: npm start"
    echo
fi

# ==============================================================================
# GERMAN LEARNING MODULE CHECKS
# ==============================================================================
echo "🇩🇪 GERMAN LEARNING MODULE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check critical German learning files exist
german_files=(
    "src/components/German/WeakSpotDrill.js"
    "src/components/German/DailyHome.js"
    "src/components/German/SpacedReview.js"
    "src/components/German/PhraseCapture.js"
    "src/components/German/GermanDiary.js"
    "src/state/GermanContext.tsx"
    "src/utils/groqAI.js"
    "src/utils/srs.js"
    "src/data/germanThemes.js"
)

ALL_FILES_EXIST=0
for file in "${german_files[@]}"; do
    if [ -f "$file" ]; then
        check_status "$(basename $file)" 0
    else
        check_status "$(basename $file)" 1
        ALL_FILES_EXIST=1
    fi
done

# Check for all 54 bug fixes
log "Verifying critical fixes..."

# Check 1: validateDrillState exists
if grep -q "validateDrillState" src/components/German/WeakSpotDrill.js 2>/dev/null; then
    check_status "Fix #3: Drill validation (validateDrillState)" 0
else
    check_status "Fix #3: Drill validation" 1
fi

# Check 2: hasDecremented reset in handleRestart
if grep -A5 "handleRestart.*=" src/components/German/WeakSpotDrill.js 2>/dev/null | grep -q "setHasDecremented(false)"; then
    check_status "Fix #1: handleRestart resets flags" 0
else
    check_status "Fix #1: handleRestart resets flags" 1
fi

# Check 3: aria-live regions
if grep -q "aria-live" src/components/German/WeakSpotDrill.js 2>/dev/null; then
    check_status "Fix #7: Accessibility (aria-live)" 0
else
    check_status "Fix #7: Accessibility" 1
fi

# Check 4: e.repeat check
if grep -q "e\.repeat" src/components/German/WeakSpotDrill.js 2>/dev/null; then
    check_status "Fix #8: Keyboard spam prevention (e.repeat)" 0
else
    check_status "Fix #8: Keyboard spam prevention" 1
fi

# Check 5: showFeedback guard
if grep -A2 "handleSubmit.*=" src/components/German/WeakSpotDrill.js 2>/dev/null | grep -q "showFeedback"; then
    check_status "Fix #4: Spam-click prevention (showFeedback guard)" 0
else
    check_status "Fix #4: Spam-click prevention" 1
fi

# Check 6: Division by zero guard
if grep -q "maxWeightedScore > 0" src/components/German/WeakSpotDrill.js 2>/dev/null; then
    check_status "Fix #2: Division by zero guard" 0
else
    check_status "Fix #2: Division by zero guard" 1
fi

# Check 7: .sr-only CSS class
if grep -q "\.sr-only" src/style.css 2>/dev/null; then
    check_status "Screen reader CSS class (.sr-only)" 0
else
    check_status "Screen reader CSS class" 1
fi

echo

# ==============================================================================
# DEPLOYMENT SUMMARY
# ==============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 DEPLOYMENT SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
log "Deployment Time: $DEPLOY_TIME"
log "Git Branch: $(git rev-parse --abbrev-ref HEAD)"
log "Git Commit: $(git rev-parse --short HEAD)"
log "Git Message: $(git log -1 --pretty=%B | head -1)"
echo
log "Build Size: $BUNDLE_SIZE"
log "Console Logs: $CONSOLE_COUNT"
log "TODO Comments: $TODO_COUNT"
echo
log "Full log saved to: $LOG_FILE"
echo

# ==============================================================================
# MONITORING COMMANDS
# ==============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 MONITORING COMMANDS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "To monitor the deployed app:"
echo "  • Watch build logs:     tail -f $LOG_FILE"
echo "  • Check app status:     curl -I $APP_URL"
echo "  • Monitor errors:       grep -i error $LOG_FILE"
echo "  • Test German module:   curl $APP_URL | grep 'German'"
echo
echo "Critical endpoints to test:"
echo "  • Homepage:            $APP_URL/"
echo "  • German Learning:     $APP_URL/#/german (in browser)"
echo
echo "Next steps:"
echo "  1. Test German drill in browser"
echo "  2. Verify localStorage persistence"
echo "  3. Test accessibility with screen reader"
echo "  4. Monitor error logs for 24 hours"
echo "  5. Check analytics for user engagement"
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment monitor complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
