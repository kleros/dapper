import { renderIf } from './redux'

describe('renderIf', () => {
  const resource = {
    creating: true,
    failedCreating: true,
    loading: true,
    data: null,
    failedLoading: true,
    updating: true,
    failedUpdating: true,
    deleting: true,
    failedDeleting: true
  }
  const render = {
    creating: 'creating',
    loading: 'loading',
    updating: 'updating',
    deleting: 'deleting',
    done: 'done',
    failedCreating: 'failedCreating',
    failedLoading: 'failedLoading',
    failedUpdating: 'failedUpdating',
    failedDeleting: 'failedDeleting',
    loadingExtra: 'loadingExtra',
    failedLoadingExtra: 'failedLoadingExtra'
  }

  it('renders the correct value for each condition.', () => {
    expect(renderIf(resource, render)).toBe(render.failedCreating)

    resource.failedCreating = false
    expect(renderIf(resource, render)).toBe(render.failedLoading)

    resource.failedLoading = false
    expect(renderIf(resource, render)).toBe(render.failedUpdating)

    resource.failedUpdating = false
    expect(renderIf(resource, render)).toBe(render.failedDeleting)

    resource.failedDeleting = false
    expect(renderIf(resource, render)).toBe(render.creating)

    resource.creating = false
    expect(renderIf(resource, render)).toBe(render.loading)

    resource.loading = false
    expect(renderIf(resource, render)).toBe(render.updating)

    resource.updating = false
    expect(renderIf(resource, render)).toBe(render.deleting)

    resource.deleting = false
    expect(renderIf(resource, render, { extraFailedValues: [true] })).toBe(
      render.failedLoadingExtra
    )

    expect(renderIf(resource, render, { extraLoadingValues: [true] })).toBe(
      render.loadingExtra
    )

    expect(renderIf(resource, render)).toBe(render.failedLoading)

    resource.data = 'data'
    expect(renderIf(resource, render)).toBe(render.done)
  })
})
