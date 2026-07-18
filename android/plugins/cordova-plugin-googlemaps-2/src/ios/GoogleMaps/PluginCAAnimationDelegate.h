//
//  PluginCAAnimationDelegate.h
//
//  Created by Manuel Beck on 22.03.25.
//
#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>

@interface PluginCAAnimationDelegate : NSObject<CAAnimationDelegate>

@property (nonatomic, copy) void (^callbackBlock)(void);

- (instancetype)initWithCallbackBlock:(void (^)(void))callbackBlock;

@end
