import { useState } from 'react';
import { Link as LinkIcon, Upload, Trash2, RefreshCw, Code, FileText, Brain, BoxIcon, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from '../../features/ui/magic/magic-card';
import { AnimatedBadge, StatusBadge } from '../../features/ui/magic/animated-badge';
import { MagicCheckbox } from '../../features/ui/magic/magic-checkbox';
import { MagicButton } from '../../features/ui/magic/magic-button';
import { MagicModal, MagicModalFooter } from '../../features/ui/magic/magic-modal';
import { KnowledgeItem, knowledgeBaseService } from '../../services/knowledgeBaseService';
import { CodeViewerModal, CodeExample } from '../code/CodeViewerModal';
import { EditKnowledgeItemModal } from './EditKnowledgeItemModal';

const guessLanguageFromTitle = (title: string = ''): string => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('javascript') || titleLower.includes('js')) return 'javascript';
  if (titleLower.includes('typescript') || titleLower.includes('ts')) return 'typescript';
  if (titleLower.includes('react')) return 'jsx';
  if (titleLower.includes('html')) return 'html';
  if (titleLower.includes('css')) return 'css';
  if (titleLower.includes('python')) return 'python';
  if (titleLower.includes('java')) return 'java';
  return 'javascript';
};

interface TagsDisplayProps {
  tags: string[];
}

const TagsDisplay = ({ tags }: TagsDisplayProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!tags || tags.length === 0) return null;

  const visibleTags = tags.slice(0, 4);
  const remainingTags = tags.slice(4);
  const hasMoreTags = remainingTags.length > 0;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 h-full">
        {visibleTags.map((tag, index) => (
          <AnimatedBadge
            key={index}
            variant="default"
            size="sm"
          >
            {tag}
          </AnimatedBadge>
        ))}
        {hasMoreTags && (
          <div
            className="cursor-pointer relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <AnimatedBadge
              variant="shimmer"
              size="sm"
            >
              +{remainingTags.length} more
            </AnimatedBadge>
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded-lg border border-cyan-500/30 bg-black/95 px-3 py-2 text-xs text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md z-50 whitespace-nowrap"
                >
                  <div className="font-semibold text-cyan-500 mb-1">
                    Additional Tags:
                  </div>
                  {remainingTags.map((tag, index) => (
                    <div key={index} className="text-gray-300">
                      • {tag}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

const DeleteConfirmModal = ({
  onConfirm,
  onCancel,
  title,
  message,
}: DeleteConfirmModalProps) => {
  return (
    <MagicModal isOpen={true} onClose={onCancel} title={title} size="sm">
      <p className="text-gray-400 mb-6">{message}</p>
      <MagicModalFooter>
        <MagicButton variant="ghost" onClick={onCancel}>
          Cancel
        </MagicButton>
        <MagicButton variant="glow" onClick={onConfirm}>
          Delete
        </MagicButton>
      </MagicModalFooter>
    </MagicModal>
  );
};

interface KnowledgeItemCardProps {
  item: KnowledgeItem;
  onDelete: (sourceId: string) => void;
  onUpdate?: () => void;
  onRefresh?: (sourceId: string) => void;
  onBrowseDocuments?: (sourceId: string) => void;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: (event: React.MouseEvent) => void;
}

export const KnowledgeItemCard = ({
  item,
  onDelete,
  onUpdate,
  onRefresh,
  onBrowseDocuments,
  isSelectionMode = false,
  isSelected = false,
  onToggleSelection
}: KnowledgeItemCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showCodeTooltip, setShowCodeTooltip] = useState(false);
  const [showPageTooltip, setShowPageTooltip] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadedCodeExamples, setLoadedCodeExamples] = useState<any[] | null>(null);
  const [isLoadingCodeExamples, setIsLoadingCodeExamples] = useState(false);
  const [isRecrawling, setIsRecrawling] = useState(false);

  const statusMap: Record<string, 'active' | 'inactive' | 'pending' | 'error' | 'success'> = {
    active: 'active',
    processing: 'pending',
    error: 'error'
  };

  const getCardColor = () => {
    if (item.metadata.source_type === 'url') {
      return item.metadata.knowledge_type === 'technical' ? '#E8B923' : '#FFD700';
    } else {
      return item.metadata.knowledge_type === 'technical' ? '#FF9900' : '#D97706';
    }
  };

  const getIconColor = () => {
    if (item.metadata.source_type === 'url') {
      return item.metadata.knowledge_type === 'technical' ? 'text-[#E8B923]' : 'text-cyan-500';
    } else {
      return item.metadata.knowledge_type === 'technical' ? 'text-purple-500' : 'text-pink-500';
    }
  };

  const TypeIcon = item.metadata.knowledge_type === 'technical' ? BoxIcon : Brain;
  const iconColor = getIconColor();
  const cardGradientColor = getCardColor();

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDelete(item.source_id);
      setShowDeleteConfirm(false);
    }, 500);
  };

  const handleRefresh = () => {
    if (onRefresh && !isRecrawling) {
      setIsRecrawling(true);
      onRefresh(item.source_id);
      setTimeout(() => {
        setIsRecrawling(false);
      }, 60000);
    }
  };

  const codeExamplesCount = item.metadata.code_examples_count || 0;

  const handleOpenCodeModal = async () => {
    setShowCodeModal(true);

    if (!loadedCodeExamples && !isLoadingCodeExamples && codeExamplesCount > 0) {
      setIsLoadingCodeExamples(true);
      try {
        const response = await knowledgeBaseService.getCodeExamples(item.source_id);
        if (response.success) {
          setLoadedCodeExamples(response.code_examples);
        }
      } catch (error) {
        console.error('Failed to load code examples:', error);
      } finally {
        setIsLoadingCodeExamples(false);
      }
    }
  };

  const codeExamples: CodeExample[] =
    (loadedCodeExamples || item.code_examples || []).map((example: any, index: number) => ({
      id: example.id || `${item.id}-example-${index}`,
      title: example.metadata?.example_name || example.metadata?.title || example.summary?.split('\n')[0] || 'Code Example',
      description: example.summary || 'No description available',
      language: example.metadata?.language || guessLanguageFromTitle(example.metadata?.title || ''),
      code: example.content || example.metadata?.code || '// Code example not available',
      tags: example.metadata?.tags || [],
    }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        scale: isRemoving ? 0.8 : 1
      }}
      transition={{ duration: 0.3 }}
      className="relative h-full"
    >
      <MagicCard
        gradientColor={cardGradientColor}
        showBorderBeam={!isSelectionMode}
        beamDuration={15}
        className={`relative h-full flex flex-col p-6 ${
          isSelected ? 'ring-2 ring-cyan-500' : ''
        } ${isSelectionMode ? 'cursor-pointer' : ''}`}
        onClick={(e) => {
          if (isSelectionMode && onToggleSelection) {
            e.stopPropagation();
            onToggleSelection(e);
          }
        }}
      >
        {isSelectionMode && (
          <div className="absolute top-4 right-4 z-20">
            <MagicCheckbox
              checked={isSelected}
              onChange={() => {}}
              variant="glow"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          {item.metadata.source_type === 'url' ? (
            <LinkIcon
              className={`w-4 h-4 ${iconColor}`}
              title={item.metadata.original_url || item.url || 'URL not available'}
            />
          ) : (
            <Upload className={`w-4 h-4 ${iconColor}`} />
          )}
          <TypeIcon className={`w-4 h-4 ${iconColor}`} />
          <h3 className="text-white font-medium flex-1 line-clamp-1 truncate min-w-0">
            {item.title}
          </h3>
          {!isSelectionMode && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <MagicButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditModal(true);
                }}
                className="p-1"
              >
                <Pencil className="w-3 h-3" />
              </MagicButton>
              <MagicButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                className="p-1 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
              </MagicButton>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {item.metadata.description || 'No description available'}
        </p>

        {/* Tags */}
        <div className="flex-1 flex flex-col min-h-[4rem]">
          <TagsDisplay tags={item.metadata.tags || []} />
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            {item.metadata.source_type === 'url' && (
              <MagicButton
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRecrawling}
                className="mb-1 px-2 py-1"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${isRecrawling ? 'animate-spin' : ''}`} />
                <span className="text-sm">{isRecrawling ? 'Recrawling...' : 'Recrawl'}</span>
              </MagicButton>
            )}
            <span className="text-xs text-gray-500">
              Updated: {new Date(item.updated_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {codeExamplesCount > 0 && (
              <div
                className="relative cursor-pointer"
                onClick={handleOpenCodeModal}
                onMouseEnter={() => setShowCodeTooltip(true)}
                onMouseLeave={() => setShowCodeTooltip(false)}
              >
                <div className="flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-500/20 px-2 py-1 shadow-[0_0_15px_rgba(34,211,238,0.3)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  <Code className="w-3 h-3 text-cyan-500" />
                  <span className="text-xs font-medium text-cyan-500">
                    {codeExamplesCount}
                  </span>
                </div>
                <AnimatePresence>
                  {showCodeTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded-lg border border-cyan-500/30 bg-black/95 px-3 py-2 text-xs text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md z-50 max-w-xs"
                    >
                      <div className="font-semibold mb-2 text-cyan-500">
                        Click for Code Browser
                      </div>
                      <div className="max-h-32 overflow-y-auto">
                        {codeExamples.map((example, index) => (
                          <div key={index} className="mb-1 text-gray-300">
                            • {example.title}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div
              className="relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (onBrowseDocuments) {
                  onBrowseDocuments(item.source_id);
                }
              }}
              onMouseEnter={() => setShowPageTooltip(true)}
              onMouseLeave={() => setShowPageTooltip(false)}
            >
              <div className="flex items-center gap-1 rounded-full border border-orange-500/40 bg-orange-500/20 px-2 py-1 shadow-[0_0_15px_rgba(251,146,60,0.3)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)]">
                <FileText className="w-3 h-3 text-orange-400" />
                <span className="text-xs font-medium text-orange-400">
                  {Math.ceil((item.metadata.word_count || 0) / 250).toLocaleString()}
                </span>
              </div>
              <AnimatePresence>
                {showPageTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded-lg border border-orange-500/30 bg-black/95 px-3 py-2 text-xs text-white shadow-[0_0_30px_rgba(251,146,60,0.3)] backdrop-blur-md z-50 whitespace-nowrap"
                  >
                    <div className="font-medium mb-1 text-orange-300">
                      Click to Browse Documents
                    </div>
                    <div className="text-gray-300 space-y-0.5">
                      <div>{(item.metadata.word_count || 0).toLocaleString()} words</div>
                      <div>= {Math.ceil((item.metadata.word_count || 0) / 250).toLocaleString()} pages</div>
                      <div>= {((item.metadata.word_count || 0) / 80000).toFixed(1)} average novels</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <StatusBadge
              status={statusMap[item.metadata.status || 'active']}
            />
          </div>
        </div>
      </MagicCard>

      {showCodeModal && (
        <CodeViewerModal
          examples={codeExamples}
          onClose={() => setShowCodeModal(false)}
          isLoading={isLoadingCodeExamples}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          title="Delete Knowledge Item"
          message="Are you sure you want to delete this knowledge item? This action cannot be undone."
        />
      )}

      {showEditModal && (
        <EditKnowledgeItemModal
          item={item}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            if (onUpdate) onUpdate();
          }}
        />
      )}
    </motion.div>
  );
};