### Added simple composable to store the dragged item.

**Reasoning**: Be able to determine what type of item is being dragged over. With this information I can determine if item can be dropped.

**Example**: "_Column_" is being dragged over "_Task_". We want to forbidden dropping the _Column_ on the _Task_. Column needs to be dropped on a Column.

**Implementation note**:
- Custom transfer added to `event.dataTransfer` on `dragstart` is not accessible  on `dragover | dragenter | dragend | dragleave | drag`. It is accessible only on `dragstart | drop` events.
- For this reason I decided to store `item` in the Composable `ref`.

**Final note**: I am aware the solution is not perfect. We could use only created Composable and ditch using `event.dataTransfer` at all.  However the purpose of working on this project was to learn more about "_drag and drop_" Browser feature. This repo remains a reference to this learning process and that is why I am going to keep this "mixed" implementation of both.