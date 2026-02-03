import CategoryNode from "./CategoryNode";

interface CategoryTreeProps {
  parentCategory: any;
  childCategories: any[];
}

export default function CategoryTree(props: CategoryTreeProps) {
  const { parentCategory, childCategories } = props;
  const hasChildren = childCategories && childCategories.length > 0;
  const childrenCount = childCategories?.length || 0;

  return (
    <div className="flex items-start">
      <div className="pt-3 pr-4 shrink-0">
        <CategoryNode category={parentCategory} />
      </div>

      {hasChildren && (
        <div className="flex pt-10">
          {childCategories.map((child, index) => (
            <div key={child.id} className="relative flex flex-col items-center">
              <div className="w-full h-5 relative">
                {/* Vertical Line */}
                <div className="h-full w-0 absolute left-1/2 border-l-2 border-gray-400" />

                {/* Horizontal Line Segment */}
                {index === 0 && (
                  <div className="absolute top-0 -left-4 right-1/2 border-t-2 border-gray-400" />
                )}
                {index < childrenCount - 1 && (
                  <div className="absolute top-0 left-1/2 w-full border-t-2 border-gray-400" />
                )}
              </div>

              <div className="px-5">
                <CategoryNode category={child} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
