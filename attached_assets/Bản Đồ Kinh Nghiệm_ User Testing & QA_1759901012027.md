# Bản Đồ Kinh Nghiệm: User Testing & QA

**Dự án**: Admin/Brands Testing

**Ngày**: 08/10/2025

**Mục đích**: Ghi nhận kinh nghiệm, patterns, và best practices để improve testing process cho lần sau

---

## 1. Testing Patterns Phát Hiện

### Pattern 1: "First Item Only" Bug

**Mô tả**: Bug chỉ xuất hiện ở items thứ 2 trở đi, không phải item đầu tiên.

**Example**:
- Edit button của Finmart (item 1) → Hoạt động đúng ✅
- Edit button của KBank (item 2) → Trigger wrong action ❌
- Edit button của VNSC (item 3) → Trigger wrong action ❌

**Root Cause**: 
- State closure capturing first item
- Event handlers không update khi iterate
- Missing unique keys trong React components

**Lesson**: **Always test multiple items**, không chỉ test item đầu tiên.

**How to Detect**:
1. Test action trên item đầu tiên
2. Test cùng action trên item thứ 2
3. Test cùng action trên item thứ 3
4. Compare results

**Prevention**:
- Use unique IDs cho mỗi item
- Proper key props trong React lists
- Test với minimum 3 items

---

### Pattern 2: "View Inconsistency" Bug

**Mô tả**: Bug xuất hiện ở một view nhưng không xuất hiện ở view khác.

**Example**:
- Table view: Edit button broken ❌
- Card view: Edit button working ✅

**Root Cause**:
- Different implementations cho table vs card
- Event handling logic khác nhau
- State management approach khác nhau

**Lesson**: **Always test all views**, không assume consistency.

**How to Detect**:
1. Test feature trong view A
2. Switch sang view B
3. Test cùng feature
4. Compare behavior

**Prevention**:
- Share common logic giữa views
- Consistent event handling patterns
- Comprehensive cross-view testing

---

### Pattern 3: "Partial Fix" Trap

**Mô tả**: Developer fix một phần của issue nhưng không fix toàn bộ.

**Example**:
- Validation cho "Tên thương hiệu" được fix ✅
- Validation cho các fields khác missing ❌
- UUID auto-generation vẫn còn ❌

**Root Cause**:
- Incomplete understanding của issue
- Time pressure
- Lack of comprehensive test cases

**Lesson**: **Verify complete fix**, không chỉ happy path.

**How to Detect**:
1. Test happy path (fixed part)
2. Test edge cases (unfixed parts)
3. Test related functionality
4. Verify no regressions

**Prevention**:
- Clear acceptance criteria
- Comprehensive test cases
- Definition of Done checklist

---

### Pattern 4: "Silent Failure" Issue

**Mô tả**: Operation fail nhưng không có error message hoặc feedback.

**Example**:
- Click button → Nothing happens
- No error message
- No loading state
- User confused

**Root Cause**:
- Missing error handling
- No user feedback implementation
- Async operations without status

**Lesson**: **Every action needs feedback**, success or failure.

**How to Detect**:
1. Perform action
2. Wait for response
3. Check for feedback (visual, message, state change)
4. Note absence of feedback

**Prevention**:
- Toast notifications system
- Loading states
- Error boundaries
- Success confirmations

---

## 2. Testing Methodology Learned

### Systematic Approach

**Step 1: Visual Inspection**
- Load page
- Check layout, spacing, alignment
- Note badge numbers, visual bugs
- Take screenshot

**Step 2: CRUD Flow Testing**
- Create: Test form validation, submission, success
- Read: Test view/detail functionality
- Update: Test edit form, validation, submission
- Delete: Test confirmation, execution

**Step 3: Search & Filter Testing**
- Test search with exact match
- Test search with partial match
- Test search with no results
- Test filters (if working)
- Test reset functionality

**Step 4: Cross-View Testing**
- Test features in table view
- Switch to card view
- Test same features
- Compare results

**Step 5: Edge Cases**
- Empty data
- Invalid data
- Boundary values
- Multiple operations
- Rapid clicking

**Step 6: Documentation**
- Log every test step
- Take screenshots
- Note observations
- Record bugs with severity

---

### Best Practices Discovered

#### 1. Test Like a Real User

**Don't**: Click through checklist mechanically

**Do**: Think như user thật:
- "Tôi muốn tạo brand mới"
- "Tôi muốn tìm brand KBank"
- "Tôi muốn sửa thông tin brand"
- "Tôi muốn xóa brand test"

#### 2. Document Everything

**Don't**: Chỉ note bugs

**Do**: Document:
- What you tested
- What you expected
- What actually happened
- Screenshots
- Steps to reproduce
- Severity assessment

#### 3. Test Multiple Scenarios

**Don't**: Test happy path only

**Do**: Test:
- Happy path
- Sad path (errors)
- Edge cases
- Boundary values
- Unusual sequences

#### 4. Compare With Previous Tests

**Don't**: Test in isolation

**Do**: Compare:
- What was broken before?
- What should be fixed now?
- Are there new bugs?
- Are there regressions?

#### 5. Think About Impact

**Don't**: Report all bugs equally

**Do**: Assess:
- Severity (Critical, High, Medium, Low)
- Impact on users
- Frequency of occurrence
- Workarounds available

---

## 3. Common Bug Patterns

### Bug Category 1: Event Handling

**Symptoms**:
- Wrong action triggered
- Wrong data displayed
- State not updating

**Examples**:
- Edit button opens delete dialog
- Filter chip opens edit form
- Button affects wrong item

**Root Causes**:
- Closure issues
- Missing event.stopPropagation()
- Wrong event target
- State not updating

**How to Test**:
- Test multiple items
- Test rapid clicking
- Test nested elements
- Check console for errors

---

### Bug Category 2: Validation

**Symptoms**:
- Invalid data accepted
- No error messages
- Partial validation only

**Examples**:
- Empty form submits
- UUID auto-generated
- Only 1 field validated

**Root Causes**:
- Incomplete validation rules
- Missing required field checks
- No server-side validation

**How to Test**:
- Submit empty form
- Submit partial data
- Submit invalid data
- Check database

---

### Bug Category 3: UI/UX

**Symptoms**:
- No feedback
- Confusing elements
- Inconsistent behavior

**Examples**:
- No success notifications
- No loading states
- Badge numbers everywhere
- Duplicate buttons

**Root Causes**:
- Missing feedback system
- Development artifacts
- Inconsistent design

**How to Test**:
- Perform actions and wait for feedback
- Look for visual inconsistencies
- Check for redundant elements
- Test user flows

---

## 4. Tools & Techniques

### Screenshot Strategy

**When to Screenshot**:
- Initial page load
- Before action
- After action
- Error states
- Success states
- Bug evidence

**Naming Convention**:
- `{timestamp}_{action}_{result}.png`
- Example: `05-13-07_edit_kbank_wrong_dialog.png`

---

### Logging Strategy

**What to Log**:
- Timestamp
- Action performed
- Expected result
- Actual result
- Observations
- Severity

**Format**:
```markdown
## Test #X: {Test Name}

**Thời gian**: HH:MM:SS
**Action**: {What you did}
**Kết quả**: ✅/❌ {What happened}

### Quan sát:
- Point 1
- Point 2

### Issues:
- Issue 1
- Issue 2
```

---

### Severity Assessment

**Critical (🔴)**:
- Data loss
- Security issues
- Core functionality broken
- No workaround

**High (🟠)**:
- Major feature broken
- Significant UX impact
- Workaround exists but difficult

**Medium (🟡)**:
- Minor feature broken
- Moderate UX impact
- Easy workaround

**Low (🟢)**:
- Cosmetic issues
- Minor UX impact
- Nice to have fixes

---

## 5. Checklist for Future Testing

### Pre-Testing

- [ ] Understand what was fixed
- [ ] Review previous test reports
- [ ] Prepare test environment
- [ ] Clear browser cache
- [ ] Create test data if needed

### During Testing

- [ ] Test systematically (CRUD flow)
- [ ] Test multiple items (not just first)
- [ ] Test all views (table, card, etc.)
- [ ] Test edge cases
- [ ] Take screenshots
- [ ] Log observations
- [ ] Note severity

### Post-Testing

- [ ] Compile test log
- [ ] Create comprehensive report
- [ ] Categorize issues by severity
- [ ] Provide recommendations
- [ ] Create action items
- [ ] Document lessons learned

---

## 6. Communication Best Practices

### Bug Report Structure

**Title**: Clear, concise, actionable

**Description**: 
- What you did
- What you expected
- What happened
- Impact

**Evidence**:
- Screenshots
- Steps to reproduce
- Test environment

**Severity**: Critical/High/Medium/Low

**Recommendation**: How to fix

---

### Report Structure

**Executive Summary**: High-level overview for management

**Detailed Findings**: Technical details for developers

**Recommendations**: Actionable items with priorities

**Appendices**: Supporting materials

---

## 7. Lessons Learned

### Technical Lessons

1. **React state management is tricky**: Closures can capture stale state
2. **Event handling needs care**: stopPropagation, proper targets, unique handlers
3. **Validation must be comprehensive**: All required fields, client + server
4. **Feedback is essential**: Notifications, loading states, error messages
5. **Multiple views need testing**: Don't assume consistency

### Process Lessons

1. **Test multiple items**: First item often works, others don't
2. **Document everything**: Screenshots and logs are invaluable
3. **Compare with previous tests**: Catch regressions early
4. **Think like a user**: Not just checklist, real scenarios
5. **Assess severity**: Not all bugs are equal

### Communication Lessons

1. **Be specific**: "Edit button of KBank" not "Edit button"
2. **Provide evidence**: Screenshots, steps to reproduce
3. **Suggest solutions**: Not just problems
4. **Prioritize**: Help team focus on critical issues
5. **Be constructive**: Goal is better product, not blame

---

## 8. Improvement Opportunities

### For Testing Process

1. **Automated regression tests**: Playwright/Cypress for repetitive tests
2. **Test data management**: Seed database with consistent test data
3. **Performance testing**: Test with 100+ items
4. **Accessibility testing**: Keyboard navigation, screen readers
5. **Mobile testing**: Responsive design verification

### For Development Process

1. **Code review focus**: Event handling, state management
2. **Unit tests**: Test handlers and state logic
3. **Integration tests**: Test API calls and data flow
4. **Peer testing**: Developers test each other's work
5. **Definition of Done**: Include testing criteria

### For Collaboration

1. **Bug triage meetings**: Discuss severity and priorities
2. **Demo sessions**: Show bugs to team
3. **Pair testing**: QA + Dev test together
4. **Feedback loops**: Quick communication on fixes
5. **Knowledge sharing**: Document patterns and solutions

---

## 9. Templates for Future Use

### Bug Report Template

```markdown
## Bug #{number}: {Title}

**Severity**: 🔴/🟠/🟡/🟢

**Description**: {Clear description}

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Expected Result**: {What should happen}

**Actual Result**: {What actually happened}

**Evidence**: {Screenshot path}

**Impact**: {Effect on users/system}

**Recommendation**: {How to fix}

**Test Environment**:
- Browser: {browser}
- OS: {os}
- Date: {date}
```

### Test Case Template

```markdown
## Test #{number}: {Test Name}

**Thời gian**: {timestamp}
**Action**: {What you did}
**Expected**: {What should happen}
**Actual**: {What happened}
**Result**: ✅ Pass / ❌ Fail / ⚠️ Partial

### Details:
{Observations, notes, issues}
```

---

## 10. Key Takeaways

### Top 5 Testing Principles

1. **Test multiple items** - First item often works, others don't
2. **Test all views** - Different implementations, different bugs
3. **Test like a user** - Real scenarios, not just checklists
4. **Document everything** - Screenshots, logs, observations
5. **Assess severity** - Help team prioritize

### Top 5 Bug Patterns

1. **Event handling issues** - Wrong actions, wrong items
2. **Incomplete validation** - Partial fixes, missing checks
3. **Missing feedback** - No notifications, no loading states
4. **View inconsistencies** - Works in one view, not another
5. **State management** - Closures, stale state, wrong updates

### Top 5 Recommendations

1. **Fix critical bugs first** - Event handling, validation
2. **Implement feedback systems** - Notifications, loading states
3. **Test comprehensively** - Multiple items, views, scenarios
4. **Automate regression tests** - Save time, catch regressions
5. **Improve collaboration** - QA + Dev working together

---

**Prepared by**: QA Tester

**Date**: 08/10/2025

**Version**: 1.0

**Next Review**: After next testing cycle
