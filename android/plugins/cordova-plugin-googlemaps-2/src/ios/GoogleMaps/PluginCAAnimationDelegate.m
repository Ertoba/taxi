//
//  PluginCAAnimationDelegate.h
//
//  Created by Manuel Beck on 22.03.25.
//

#import "PluginCAAnimationDelegate.h"

@implementation PluginCAAnimationDelegate

- (instancetype)initWithCallbackBlock:(void (^)(void))callbackBlock {
    self = [super init];
    self.callbackBlock = callbackBlock;
    return self;
}

- (void)animationDidStop:(CAAnimation *)animation finished:(BOOL)finished
{
    NSLog(@"animationDidStop, finished=%s", finished ? "true" : "false");
    if (!finished) return;
    self.callbackBlock();
}

@end
