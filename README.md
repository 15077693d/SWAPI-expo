# React Native Learning #1 Summary

<img src="./readme.gif" width="200" alt="Infinite Query Demo"/>

## 1. useInfiniteQuery

- Handles pagination in React Query
- Key components: `queryFn`, `getNextPageParam`, `initialPageParam`
- Access data through `data.pages`
- Provides utilities: `fetchNextPage`, `hasNextPage`, `isFetchingNextPage`
- Refresh handling requires proper cache invalidation
- Works well with FlatList for infinite scrolling

## 2. React Native FlatList

- Efficient list rendering component
- Key props:
  - `data`: Array of items to render
  - `renderItem`: Component for each item
  - `keyExtractor`: Unique key for items
  - `onEndReached`: Load more data
  - `refreshControl`: Pull-to-refresh
- Performance optimizations:
  - `removeClippedSubviews`
  - `getItemLayout`
  - `windowSize`
  - `maxToRenderPerBatch`

## 3. Async Storage

- Key-value storage system for React Native
- Async operations with `getItem`, `setItem`, `removeItem`
- Alternative: MMKV for better performance
- Common uses:
  - Caching
  - User preferences
  - Authentication tokens
  - Offline data

## 4. Expo Router

- File-based routing system
- Key features:
  - Nested navigation
  - Dynamic routes
  - URL patterns
  - Deep linking
- File structure:
  - `app/` directory for routes
  - `_layout.tsx` for layouts
  - Dynamic routes with `[param].tsx`
  - Groups with `(group)`
- Navigation:
  - `useRouter()`
  - `Link` component
  - `Redirect` component

## Key Takeaways

- Combine useInfiniteQuery with FlatList for efficient infinite scrolling
- Use MMKV over AsyncStorage for better performance
- Expo Router provides a modern, file-based routing solution
- Performance optimization is crucial for smooth user experience

## Common Patterns

- Pull-to-refresh implementation
- Infinite scroll with loading states
- Persistent storage strategies
- Type-safe routing with TypeScript
