import { promises as fs } from 'fs';
import path from 'path';

interface ImageInfo {
  name: string;
  path: string;
  directory: string;
  sizeKB: number;
}

async function scanImages(): Promise<ImageInfo[]> {
  const publicDir = path.join(process.cwd(), 'public');
  const images: ImageInfo[] = [];

  async function walk(dir: string) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/i.test(entry.name)) {
          const stat = await fs.stat(fullPath);
          const relativePath = fullPath.replace(publicDir, '').replace(/\\/g, '/');
          const relativeDir = path.dirname(relativePath);
          images.push({
            name: entry.name,
            path: relativePath,
            directory: relativeDir || '/',
            sizeKB: Math.round(stat.size / 1024),
          });
        }
      }
    } catch {
      // skip inaccessible directories
    }
  }

  await walk(publicDir);
  return images.sort((a, b) => a.directory.localeCompare(b.directory) || a.name.localeCompare(b.name));
}

export default async function AdminImagesPage() {
  const images = await scanImages();
  const totalSizeKB = images.reduce((sum, img) => sum + img.sizeKB, 0);
  const totalSizeMB = (totalSizeKB / 1024).toFixed(1);

  // Group by directory
  const grouped: Record<string, ImageInfo[]> = {};
  for (const img of images) {
    if (!grouped[img.directory]) grouped[img.directory] = [];
    grouped[img.directory].push(img);
  }

  const directories = Object.keys(grouped).sort();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Images</h1>
        <p className="text-gray-500 mt-1">
          {images.length} images in the public directory ({totalSizeMB} MB total).
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 font-medium">Total Images</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{images.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 font-medium">Total Size</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalSizeMB} MB</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500 font-medium">Directories</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{directories.length}</p>
        </div>
      </div>

      {/* Images by directory */}
      {directories.map((dir) => (
        <div key={dir} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{dir}</code>
            <span className="text-sm font-normal text-gray-500 ml-2">({grouped[dir].length} files)</span>
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">File Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Path</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {grouped[dir].map((img, idx) => (
                  <tr key={img.path} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-2">
                      <span className="text-sm font-medium text-gray-900">{img.name}</span>
                    </td>
                    <td className="px-4 py-2">
                      <code className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{img.path}</code>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span className={`text-sm font-mono ${img.sizeKB > 500 ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                        {img.sizeKB > 1024 ? `${(img.sizeKB / 1024).toFixed(1)} MB` : `${img.sizeKB} KB`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {images.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-gray-500">No images found in the public directory.</p>
        </div>
      )}
    </div>
  );
}
